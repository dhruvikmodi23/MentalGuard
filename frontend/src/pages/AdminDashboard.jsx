import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button, Modal, Form, Alert, Table, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { NotificationContext } from "../context/NotificationContext";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const { addNotification } = useContext(NotificationContext);

  // Calculate today's date and time
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const currentTime = today.toTimeString().substring(0, 5); // Format: HH:MM
  const minTime = newDate === todayDate ? currentTime : "00:00"; // Update minTime based on newDate

  // Function to fetch appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/appointments/admin",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log("Fetched appointments for admin:", res.data);
      setAppointments(res.data);
    } catch (err) {
      setError("Failed to fetch appointments. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/api/appointments/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setAppointments(
        appointments.filter((appointment) => appointment._id !== id)
      );
      setSuccess("Appointment canceled successfully.");
      toast.success("Appointment canceled successfully.");
    } catch (err) {
      setError("Failed to cancel the appointment. Please try again later.");
    }
  };

  const handleShow = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setShowRescheduleModal(false);
    setNewDate("");
    setNewTime("");
  };

  const handleApprove = async (id) => {
    const reason = "Approved by admin";
    try {
      await axios.patch(
        `http://localhost:5001/api/appointments/${id}/approve`,
        { status: "approved", reason },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      toast.success("Appointment approved!");
      fetchAppointments(); // Refresh data
      addNotification("Appointment has been approved.");
    } catch (err) {
      toast.error("Failed to approve appointment.");
    }
  };

  const handleReschedule = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5001/api/appointments/${id}/reschedule`,
        { date: newDate, time: newTime },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      toast.success("Appointment rescheduled!");
      fetchAppointments(); // Refresh data
      handleClose(); // Close the modal
    } catch (err) {
      toast.error("Failed to reschedule appointment.");
    }
  };

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // e.g., "12:23 PM"
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-200 to-teal-200 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-[#05445e] mb-8">Manage Appointments</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={12}>
          <Card className="shadow-md mt-5">
            <Card.Header>
              <h5>All Appointments</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive className="text-center">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Service</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Booked On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td>{formatTime(appointment.time)}</td>
                        <td>{appointment.service}</td>
                        <td>{appointment.user?.name || "N/A"}</td>
                        <td>{appointment.user?.email || "N/A"}</td>
                        <td>
                          {new Date(appointment.bookedOn).toLocaleString()}
                        </td>
                        <td>
                          <div className="space-y-2">
                            <Button variant="outline-danger" size="sm" className="w-full" onClick={() => cancelAppointment(appointment._id)}>
                              Cancel
                            </Button>
                            <Button variant="outline-success" size="sm" className="w-full" onClick={() => handleApprove(appointment._id)}>
                              Approve
                            </Button>
                            <Button variant="outline-primary" size="sm" className="w-full" onClick={() => setShowRescheduleModal(true)}>
                              Reschedule
                            </Button>
                            <Button variant="outline-info" size="sm" className="w-full" onClick={() => handleShow(appointment)}>
                              View Details
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">No appointments found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Appointment Details Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p><strong>Name:</strong> {selectedAppointment.user?.name || "N/A"}</p>
              <p><strong>Email:</strong> {selectedAppointment.user?.email || "N/A"}</p>
              <p><strong>Message:</strong> {selectedAppointment.message || "N/A"}</p>
              <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {formatTime(selectedAppointment.time)}</p>
              <p><strong>Service:</strong> {selectedAppointment.service}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Reschedule Appointment Modal */}
      <Modal show={showRescheduleModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <Form.Group controlId="formNewDate">
                <Form.Label>New Date</Form.Label>
                <Form.Control type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} min={todayDate} required />
              </Form.Group>
              <Form.Group controlId="formNewTime">
                <Form.Label>New Time</Form.Label>
                <Form.Control type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} min={minTime} required />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={() => handleReschedule(selectedAppointment._id)}>Reschedule</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
