# English Master Fullstack

## Como executar o projeto:

1. Acesse a pasta `backend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie sua conta no Supabase e crie um novo projeto.
4. No Editor SQL do Supabase, cole e execute o conteúdo do arquivo `database.sql` para criar as tabelas e inserir as palavras.
5. Copie a URL e a Anon Key do seu projeto Supabase e cole no arquivo `.env` localizado na pasta `backend`.
6. Inicie o servidor:
   ```bash
   npm run dev
   ```
7. Acesse `http://localhost:3000` no seu navegador. O frontend será servido automaticamente pelo Express.

## Fazer o Deploy (Render/Railway):
- Conecte seu repositório GitHub ao Render ou Railway.
- Adicione as variáveis de ambiente (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `JWT_SECRET`).
- Defina o comando de build como vazio e o comando de start como `node backend/server.js` (ajuste o caminho se necessário).
