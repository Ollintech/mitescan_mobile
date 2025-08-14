# 🐝 HIVE SCAN - Aplicativo Mobile de Apicultura

## 📱 Sobre o Projeto

O **HIVE SCAN** é um aplicativo mobile desenvolvido em React Native com Expo, focado no monitoramento e análise de colmeias para apicultores. O app permite gerenciar colmeias, realizar análises de saúde, acompanhar histórico de análises e gerenciar usuários do sistema.

## ✨ Funcionalidades Principais

### 🔐 Autenticação
- **Tela de Loading** com animação e logo
- **Login** com email e senha
- **Cadastro** de novos usuários
- **Recuperação de senha**

### 🏠 Gestão de Colmeias
- **Dashboard** com visão geral das colmeias
- **Lista de Colmeias** com busca e filtros
- **Cadastro de Nova Colmeia** com foto e localização
- **Edição de Colmeias** existentes
- **Exclusão** de colmeias
- **Status** das colmeias (Saudável, Atenção, Crítica)

### 🗺️ Mapa e Localização
- **Mapa interativo** das colmeias
- **Marcadores** coloridos por status
- **GPS** para localização atual
- **Legenda** dos status

### 🔬 Análise de Colmeias
- **Análise rápida** por GPS
- **Análise detalhada** por colmeia selecionada
- **Processo de análise** com loading
- **Resultados** com confiança

### 📸 Câmera
- **Captura de fotos** das colmeias
- **Controles de câmera** (flash, zoom)
- **Grid de foco** para melhor enquadramento
- **Preview** da foto capturada

### 📊 Histórico e Relatórios
- **Histórico completo** de análises
- **Filtros** por resultado
- **Estatísticas** de análises
- **Detalhes** de cada análise

### 👥 Gestão de Usuários
- **Lista de usuários** com busca
- **Perfis** (Admin, Gerente, Usuário)
- **Status** (Ativo/Inativo)
- **Edição** de informações
- **Exclusão** de usuários

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo SDK 50** - Plataforma de desenvolvimento
- **React Navigation** - Navegação entre telas
- **Expo Linear Gradient** - Gradientes e efeitos visuais
- **Expo Camera** - Funcionalidades de câmera
- **Expo Location** - Serviços de localização
- **Expo Image Picker** - Seleção de imagens

## 📱 Estrutura do Projeto

```
mitescan_mobile/
├── App.js                    # Arquivo principal do app
├── src/
│   ├── screens/             # Telas do aplicativo
│   │   ├── LoadingScreen.js
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── BeehiveListScreen.js
│   │   ├── BeehiveEditScreen.js
│   │   ├── BeehiveRegisterScreen.js
│   │   ├── MapScreen.js
│   │   ├── CameraScreen.js
│   │   ├── AnalysisScreen.js
│   │   ├── HistoryScreen.js
│   │   ├── UsersScreen.js
│   │   └── UserEditScreen.js
│   ├── components/          # Componentes reutilizáveis
│   └── assets/             # Imagens e recursos
├── package.json
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd mitescan_mobile
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npx expo start
```

4. **Escaneie o QR Code** com o app Expo Go no seu dispositivo

### Alternativa com Expo Go
- Instale o app **Expo Go** na Play Store/App Store
- Escaneie o QR Code que aparece no terminal
- O app será carregado automaticamente

## 🎨 Design e Interface

### Paleta de Cores
- **Primária**: #FFD700 (Dourado)
- **Secundária**: #4CAF50 (Verde)
- **Atenção**: #FF9800 (Laranja)
- **Crítica**: #F44336 (Vermelho)
- **Neutro**: #333, #666, #999

### Características Visuais
- **Tema**: Apicultura com elementos de colmeia
- **Padrões**: Fundo com padrão de colmeia hexagonal
- **Ícones**: Emojis para melhor usabilidade
- **Cards**: Design moderno com sombras e bordas arredondadas

## 📋 Funcionalidades Implementadas

### ✅ Completas
- [x] Navegação entre telas
- [x] Sistema de autenticação (mock)
- [x] Dashboard principal
- [x] Lista de colmeias
- [x] Cadastro de colmeias
- [x] Edição de colmeias
- [x] Mapa interativo
- [x] Sistema de análise
- [x] Histórico de análises
- [x] Gestão de usuários
- [x] Interface de câmera
- [x] Sistema de status e filtros

### 🔄 Em Desenvolvimento
- [ ] Integração com backend real
- [ ] Autenticação real com JWT
- [ ] Funcionalidade de câmera real
- [ ] GPS e localização real
- [ ] Upload de imagens
- [ ] Notificações push
- [ ] Sincronização offline

## 🧪 Testes

### Funcionalidades Testadas
- Navegação entre todas as telas
- Formulários de cadastro e edição
- Filtros e busca
- Estados de loading
- Alertas e confirmações
- Responsividade em diferentes tamanhos de tela

## 📱 Compatibilidade

- **Android**: 6.0 (API 23) ou superior
- **iOS**: 12.0 ou superior
- **Expo**: SDK 50
- **React Native**: 0.73.2

## 🔧 Configurações

### Permissões Necessárias
- **Câmera**: Para captura de fotos das colmeias
- **Localização**: Para GPS e mapa
- **Armazenamento**: Para salvar fotos
- **Internet**: Para sincronização de dados

## 📈 Próximos Passos

1. **Backend Integration**
   - API REST para dados das colmeias
   - Autenticação real com JWT
   - Banco de dados para persistência

2. **Funcionalidades Avançadas**
   - Análise por IA das fotos
   - Relatórios em PDF
   - Exportação de dados
   - Sincronização em tempo real

3. **Melhorias de UX**
   - Animações mais fluidas
   - Temas personalizáveis
   - Modo escuro
   - Acessibilidade

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Gustavo Marques** - Desenvolvedor Full Stack

## 📞 Suporte

Para dúvidas ou suporte:
- Email: [seu-email@exemplo.com]
- GitHub: [@seu-usuario]

---

**HIVE SCAN** - Transformando a apicultura através da tecnologia! 🐝✨