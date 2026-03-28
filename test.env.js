// test-env.mjs
import 'dotenv/config';
console.log("Sua chave é:", process.env.OPENAI_API_KEY ? "Encontrada! ✅" : "Não encontrada ❌");