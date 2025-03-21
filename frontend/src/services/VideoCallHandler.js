import { io } from "socket.io-client";

export const socket = io("http://localhost:5001");

export const setupPeerConnection = (onTrack, onIceCandidate) => {
  const peer = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  peer.ontrack = onTrack;
  peer.onicecandidate = onIceCandidate;

  return peer;
};

export const startCall = async (peer, localVideoRef) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    return stream;
  } catch (error) {
    console.error("Error accessing media devices:", error);
    return null;
  }
};
