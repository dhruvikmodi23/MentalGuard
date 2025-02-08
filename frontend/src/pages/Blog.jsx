import React from 'react';

const blogPosts = [
  {
    title: "The Importance of Mental Health Awareness",
    description: "Explore why mental health awareness is crucial in today's world and how it can help reduce stigma.",
    image: "/awareness.jfif",
    link: "https://www.cigna-me.com/en/blog/mental-health-awareness#:~:text=Mental%20health%20awareness%20refers%20to,of%20mental%20health%20and%20wellbeing."
  },
  {
    title: "5 Tips for Managing Anxiety",
    description: "Learn effective strategies to manage anxiety and improve your mental well-being.",
    image: "/anxiety.jfif",
    link: "https://www.mentalhealth.com/library/5-strategies-for-managing-anxiety"
  },
  {
    title: "Mindfulness Practices for Everyday Life",
    description: "Incorporate mindfulness into your daily routine with these simple practices.",
    image: "/practices.jfif",
    link: "https://www.mindful.org/take-a-mindful-moment-5-simple-practices-for-daily-life/"
  },
];

const Blog = () => {
  return (
    <div className="bg-gradient-to-br from-[#D4F1F4] to-[#75E6DA] py-16 text-[#05445E]">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg mb-12">
          Stay informed and inspired with our latest articles on mental health, well-being, and personal growth.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:translate-y-[-10px]">
              <img className="w-full h-48 object-cover" src={post.image} alt={post.title} />
              <div className="p-4">
                <h5 className="text-xl font-bold mb-2">{post.title}</h5>
                <p className="text-base mb-4">{post.description}</p>
                <a href={post.link} className="inline-block bg-[#75E6DA] text-white py-2 px-4 rounded-lg transition-colors hover:bg-[#63C4BA]">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
