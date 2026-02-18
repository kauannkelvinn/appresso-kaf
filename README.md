# ☕ Appresso Kaf: Life OS

![Appresso Kaf Dashboard](https://github.com/seu-usuario/appresso-kaf/raw/main/public/dashboard-preview.png)

O **Appresso Kaf** é um ecossistema de produtividade pessoal que remove a fricção da organização manual através de inteligência artificial e automação via WhatsApp. Inspirado no estilo Neo-Brutalista de Slava Design, o projeto foca em "performance bruta" e simplicidade radical.

---

## 🚀 Funcionalidades Atuais

- **WhatsApp Webhook**: Registro instantâneo de hábitos e tarefas via mensagens de texto (ex: "beber água", "treino hoje").
- **AI Command Center**: Processamento inteligente utilizando Gemini 1.5 para extrair intenções de mensagens informais e converter em dados estruturados.
- **Habit Tracker**: Grade de hábitos interativa com visualização de consistência diária e progresso percentual.
- **Activity Evolution**: Gráfico minimalista de produtividade em tempo real, integrado diretamente ao banco de dados Prisma/Supabase.
- **Hero Stats**: Visualização dramática de KPIs como *Tasks Created*, *Time Saved* e *Habit Score* com tipografia de alto impacto.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router) + Tailwind CSS
- **Backend**: Server Actions + Route Handlers (Webhooks)
- **Database**: PostgreSQL via Supabase + Prisma ORM
- **IA**: Google Gemini API
- **Infra**: Vercel para deploy contínuo e sincronização de variáveis de ambiente

---

## 🎨 Design Principles (V2)

Atualmente em fase de redesenho total para atingir um nível de excelência visual baseado no estilo **Slava Design**:

- **Tipografia**: `KH Teka Trial` (Bold/Black) com tamanhos de até 80px para impacto imediato.
- **Bento Grid**: Organização assimétrica de cards com bordas sólidas (`stroke 14%`) e cantos arredondados (`radius 10`).
- **Paleta de Cores**:
  - **Background**: `#B0ACA9` (Cinza Neutro)
  - **Cards**: `#C6BFB7` (Card Normal) e `#FB3100` (Card de Alerta/Vermelho)
  - **Texto**: `#000000` (Preto Absoluto) e `#7F7C77` (Subtítulos/Média opacidade)

---

## 🗺️ Roadmap de Design

- [x] **01. Global Dashboard** — Visão 360º de Vida, Treino e Finanças.
- [ ] **02. Deep Focus (Habits)** — Execução diária, consistência e streaks.
- [ ] **03. Performance (Treino/Dieta)** — Logbook de cargas e contagem de macros via foto.
- [ ] **04. Wealth (Finanças)** — Gestão de fluxo de caixa e organização de investimentos.

---

## 🔧 Como rodar o projeto localmente

1. **Clone o repositório**:

```bash
git clone https://github.com/seu-usuario/appresso-kaf.git
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Configure as variáveis de ambiente** (`.env`):

```env
DATABASE_URL=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_VERIFY_TOKEN=
GOOGLE_GENERATIVE_AI_API_KEY=
```

4. **Rode as migrações do Prisma**:

```bash
npx prisma migrate dev
```

5. **Inicie o servidor de desenvolvimento**:

```bash
npm run dev
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Desenvolvido por Kauan.
