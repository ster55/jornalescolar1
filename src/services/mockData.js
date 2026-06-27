// Dados falsos para demonstração sem backend
export const mockCategories = [
  { id: 1, name: 'Tecnologia' },
  { id: 2, name: 'Eventos' },
  { id: 3, name: 'Entrevistas' },
  { id: 4, name: 'Resenhas' },
  { id: 5, name: 'Escola' },
]

export const mockPosts = [
  {
    id: 1,
    title: 'Inteligência Artificial na Educação: O Futuro das Salas de Aula',
    summary: 'Como a IA está transformando o modo como aprendemos e ensinamos nas escolas do Brasil e do mundo.',
    content: `<p>A Inteligência Artificial está revolucionando diversos setores, e a educação não é exceção. Ferramentas como assistentes virtuais, plataformas adaptativas e sistemas de avaliação automatizada estão chegando às salas de aula.</p>
    <p>Professores relatam que o uso de IA permite personalizar o ensino para cada aluno, identificando dificuldades e sugerindo conteúdos específicos. Isso representa uma mudança significativa no modelo tradicional de ensino.</p>
    <p>No Brasil, diversas escolas públicas e privadas já adotam tecnologias baseadas em IA para melhorar o desempenho dos alunos. Os resultados iniciais são promissores, com aumento nas notas e maior engajamento dos estudantes.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    author: { name: 'Ana Silva' },
    category: { id: 1, name: 'Tecnologia' },
    createdAt: '2026-06-20T10:00:00',
  },
  {
    id: 2,
    title: 'Feira de Ciências 2026: Projetos que Impressionaram os Juízes',
    summary: 'Confira os melhores projetos da Feira de Ciências deste ano e conheça os alunos por trás das ideias.',
    content: `<p>A Feira de Ciências 2026 foi um sucesso absoluto. Mais de 50 projetos foram apresentados por alunos do ensino médio, com temas que variaram de energia solar a sistemas de purificação de água.</p>
    <p>O projeto vencedor, desenvolvido por alunos do 3º ano, criou um sistema de monitoramento de qualidade do ar usando sensores de baixo custo conectados a uma plataforma web.</p>
    <p>Os juízes ficaram impressionados com a qualidade e criatividade das soluções apresentadas. Vários projetos já receberam convites para participar de feiras nacionais.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    author: { name: 'Carlos Mendes' },
    category: { id: 2, name: 'Eventos' },
    createdAt: '2026-06-18T14:00:00',
  },
  {
    id: 3,
    title: 'Entrevista: Professor fala sobre o impacto da tecnologia no ensino',
    summary: 'Em entrevista exclusiva, o professor João Costa compartilha sua visão sobre como a tecnologia mudou a sala de aula.',
    content: `<p><strong>JornalTech:</strong> Professor, como a tecnologia mudou sua forma de ensinar?</p>
    <p><strong>Prof. João:</strong> A tecnologia trouxe possibilidades que antes eram inimagináveis. Hoje consigo mostrar simulações, vídeos e interagir com alunos de formas muito mais dinâmicas.</p>
    <p><strong>JornalTech:</strong> Quais são os maiores desafios?</p>
    <p><strong>Prof. João:</strong> O maior desafio é garantir que a tecnologia seja um complemento, não uma substituição ao relacionamento humano na educação. Precisamos encontrar esse equilíbrio.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    author: { name: 'Maria Santos' },
    category: { id: 3, name: 'Entrevistas' },
    createdAt: '2026-06-15T09:00:00',
  },
  {
    id: 4,
    title: 'Resenha: "Clean Code" — O livro que todo programador precisa ler',
    summary: 'Uma análise completa do clássico de Robert C. Martin e por que ele ainda é essencial para desenvolvedores modernos.',
    content: `<p>Clean Code, de Robert C. Martin, é considerado uma das obras mais importantes da programação. Publicado em 2008, o livro continua extremamente relevante nos dias de hoje.</p>
    <p>O autor apresenta princípios e práticas para escrever código limpo, legível e manutenível. Conceitos como nomes significativos, funções pequenas e comentários úteis são abordados de forma didática.</p>
    <p>Para estudantes de informática, esta é uma leitura obrigatória. O livro não apenas ensina a programar melhor, mas muda a forma como você pensa sobre código.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    author: { name: 'Pedro Oliveira' },
    category: { id: 4, name: 'Resenhas' },
    createdAt: '2026-06-12T11:00:00',
  },
  {
    id: 5,
    title: 'Curso Técnico em Informática: O que esperar do mercado de trabalho',
    summary: 'Guia completo para alunos do curso técnico que estão se preparando para entrar no mercado de tecnologia.',
    content: `<p>O mercado de tecnologia está aquecido e em constante crescimento. Para alunos do curso técnico em informática, as oportunidades são muitas, mas é preciso se preparar adequadamente.</p>
    <p>Habilidades como programação web, banco de dados e redes são altamente valorizadas. Além disso, soft skills como comunicação e trabalho em equipe fazem diferença na hora da contratação.</p>
    <p>Estágios e projetos pessoais são fundamentais para construir um portfólio sólido. Plataformas como GitHub são essenciais para mostrar seu trabalho aos recrutadores.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    author: { name: 'Lucia Ferreira' },
    category: { id: 5, name: 'Escola' },
    createdAt: '2026-06-10T16:00:00',
  },
  {
    id: 6,
    title: 'React vs Vue vs Angular: Qual framework escolher em 2026?',
    summary: 'Comparativo completo entre os principais frameworks JavaScript do mercado para ajudar na sua escolha.',
    content: `<p>A escolha do framework JavaScript certo pode fazer grande diferença no seu projeto. React, Vue e Angular são os três principais do mercado, cada um com suas vantagens.</p>
    <p>O React, criado pelo Facebook, é o mais popular e tem uma comunidade enorme. Vue é conhecido pela sua curva de aprendizado suave e excelente documentação. Angular, do Google, é robusto e ideal para projetos corporativos.</p>
    <p>Para iniciantes, Vue ou React são as melhores escolhas. Para projetos empresariais de grande porte, Angular pode ser mais adequado. O mais importante é dominar bem um deles antes de partir para o próximo.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
    author: { name: 'Rafael Costa' },
    category: { id: 1, name: 'Tecnologia' },
    createdAt: '2026-06-08T13:00:00',
  },
]

export const mockComments = [
  {
    id: 1,
    content: 'Excelente artigo! Muito informativo e bem escrito.',
    author: { name: 'João Aluno' },
    approved: true,
    createdAt: '2026-06-21T10:00:00',
  },
  {
    id: 2,
    content: 'Parabéns pela matéria! Isso vai ajudar muita gente.',
    author: { name: 'Maria Estudante' },
    approved: true,
    createdAt: '2026-06-21T14:00:00',
  },
]