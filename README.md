# TicketTouch
### Site WEB em desenvolvimento para tese de TCC do curso de Engenharia de Software

## Requisitos de Sistema

- [ ] Cadastro de Usuário: Os usuários devem ser registrados no sistema com informações: nome, endereço de e-mail e senha padrão (deverá ser trocada no login).
- [ ] Cadastro de Técnico: Os Administradores devem ter a capacidade de criar e gerenciar contas de técnico e usuários no sistema.
- [ ] Visualização de Tickets: Os usuários devem poder visualizar o histórico de seus tickets anteriores, incluindo status e detalhes da resolução.
- [ ] Atribuição de Prioridades: Os técnicos devem poder atribuir prioridades aos tickets com base na gravidade do problema relatado.
- [ ] Lista de Tickets em Aberto: O sistema deve permitir que os Administradores visualizem uma lista de todos os tickets em aberto, classificados por prioridade e status.
- [ ] Anexar Arquivos: Os usuários devem poder anexar arquivos relevantes, como capturas de tela ou documentos, ao criar um novo ticket.
- [ ] Notificações Instantâneas: Os técnicos devem receber notificações instantâneas quando um novo ticket é atribuído a eles.
- [ ] Relatórios de Desempenho: Os Administradores devem ter a capacidade de gerar relatórios sobre o desempenho da equipe de suporte, incluindo métricas como tempo médio de resolução e taxa de satisfação do cliente.
- [ ] Edição de Tickets: Os usuários devem poder editar ou atualizar informações em seus tickets, como a descrição do problema, enquanto o ticket estiver em aberto.
- [ ] Pesquisa e Filtros: Os técnicos devem poder pesquisar e filtrar tickets com base em diferentes critérios, como prioridade, data de criação e cliente.
- [ ] Interface Responsiva: O sistema deve fornecer uma interface de usuário amigável e responsiva que funcione bem em dispositivos móveis e desktops.
- [ ] Atribuição Específica: Os Administradores devem poder designar um técnico específico para um ticket.
- [ ] Notificações Automáticas: Os usuários devem receber notificações automáticas quando um novo ticket é criado e quando há atualizações no status do ticket.
- [ ] Notas Internas: Os técnicos devem poder adicionar notas internas aos tickets para registrar informações relevantes que não são visíveis para o cliente.
- [ ] Avaliação de Suporte: O sistema deve permitir que os usuários avaliem a qualidade do suporte recebido após a resolução do ticket.
- [ ] Controle de Acesso: O sistema deve liberar funcionalidades de acordo com o nível de acesso do usuário.
- [ ] Acompanhamento em Tempo Real: Os usuários devem poder visualizar o status de seus tickets em tempo real.

## Funcionalidades

- [ ] Portal de Autoatendimento: Um portal de autoatendimento onde os clientes podem encontrar respostas para suas perguntas mais comuns sem a necessidade de abrir um ticket.
- [ ] Automatização de Fluxo de Trabalho: Recursos para automatizar tarefas comuns de suporte, como roteamento automático de tickets, respostas automáticas e atribuição de prioridades.
- [ ] SLAs (Acordos de Nível de Serviço): Funcionalidade para definir e acompanhar os SLAs para garantir que os tickets sejam resolvidos dentro do prazo estabelecido.
- [ ] Colaboração em Equipe: Capacidade de colaborar em equipe para resolver tickets, atribuir tarefas a outros membros da equipe e trabalhar juntos em resoluções de problemas mais complexos.
- [ ] Base de Conhecimento: Uma base de conhecimento integrada onde os agentes podem criar e manter artigos e tutoriais úteis para ajudar os clientes a resolver problemas por conta própria.
- [ ] Acompanhamento de Métricas de Desempenho: Painéis e relatórios para acompanhar métricas de desempenho, como tempo médio de resposta, tempo médio de resolução e índice de satisfação do cliente.
- [ ] Gestão de Ativos: Capacidade de rastrear e gerenciar ativos relacionados aos tickets de suporte, como hardware, software e outros recursos técnicos.

## Requisitos do Banco de Dados

- [ ] Modelo de Dados: Desenvolver um modelo de dados adequado para armazenar informações sobre usuários, tickets, histórico de interações, configurações do sistema, entre outros.
- [ ] Segurança dos Dados: Implementar medidas de segurança para proteger os dados armazenados no banco de dados, como criptografia de dados, controle de acesso e auditoria.
- [ ] Desempenho: Projetar o banco de dados para garantir um bom desempenho, considerando fatores como índices adequados, particionamento de tabelas e otimização de consultas.
- [ ] Escalabilidade: Garantir que o banco de dados seja capaz de lidar com um aumento no volume de dados e transações ao longo do tempo, escalando horizontal ou verticalmente conforme necessário.
- [ ] Disponibilidade: Implementar mecanismos de alta disponibilidade e recuperação de desastres para minimizar o tempo de inatividade do sistema em caso de falhas no banco de dados.
- [ ] Backup e Restauração: Estabelecer procedimentos regulares de backup e restauração para proteger os dados contra perda ou corrupção, com testes periódicos de restauração.
- [ ] Integridade Referencial: Utilizar chaves estrangeiras e restrições de integridade referencial para garantir a consistência dos dados e evitar inconsistências ou conflitos.
- [ ] Normalização: Aplicar técnicas de normalização para reduzir a redundância de dados e melhorar a eficiência do armazenamento e consulta de informações.
- [ ] Indexação: Identificar e criar índices adequados para acelerar consultas frequentes e melhorar o desempenho geral do banco de dados.
- [ ] Suporte a Transações: Implementar controle de transações para garantir a consistência dos dados e permitir operações de rollback em caso de falhas ou erros.
- [ ] Monitoramento e Diagnóstico: Configurar ferramentas de monitoramento e diagnóstico para acompanhar o desempenho do banco de dados e identificar possíveis problemas ou gargalos.
