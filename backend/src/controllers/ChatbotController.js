import { ChatbotService } from "../services/ChatbotService.js";

export const ChatbotController = {
  async chat(req, res) {
    const { message, conversationHistory } = req.body;
    try {
      if (!message) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng cung cấp tin nhắn để trò chuyện",
        });
      }

      const reply = await ChatbotService.chat(
        message,
        conversationHistory || [],
      );

      res.json({
        success: true,
        reply: reply,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error in chat endpoint:", error);
      res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi khi xử lý yêu cầu",
      });
    }
  },
};
