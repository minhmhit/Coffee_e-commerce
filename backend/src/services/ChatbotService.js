import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `Bạn là một trợ lý ảo cho cửa hàng cà phê, giúp khách hàng tìm kiếm sản phẩm, đặt hàng và giải đáp thắc mắc về sản phẩm. Hãy trả lời ngắn gọn và chính xác 
Hãy giúp khách hàng :
- Tư vấn sản phẩm cà phê phù hợp với yêu cầu mà họ đưa ra (ví dụ : mức giá , loại hạt , khối lượng,...).
- Hướng dẫn khách hàng cách đặt hàng và thanh toán.
- Giải đáp thắc mắc về sản phẩm (ví dụ : thành phần, cách sử dụng, bảo quản,...).
- Cung cấp thông tin về chương trình khuyến mãi và mã giảm giá hiện có.
- Hỗ trợ khách hàng trong việc theo dõi đơn hàng và xử lý các vấn đề liên quan đến đơn hàng.
- Đảm bảo rằng khách hàng có trải nghiệm mua sắm tốt nhất tại cửa hàng cà phê của bạn.`;

export const ChatbotService = {
  async chat(mes, conversationHistory = []) {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: "user", content: mes },
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  },
};
