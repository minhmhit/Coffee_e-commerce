import axiosInstance from "./axiosConfig";

export const chatbotAPI = {
  chat: (message, conversationHistory) => {
    return axiosInstance.post("/chatbot/chat", {
      message,
      conversationHistory,
    });
  },
};
