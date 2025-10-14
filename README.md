# 🐝 MITE SCAN

## 📱 Sobre o Projeto

O **MITE SCAN** é um aplicativo mobile desenvolvido em React Native com Expo, focado no monitoramento e análise de colmeias para apicultores. O app permite gerenciar colmeias, realizar análises de saúde, acompanhar histórico de análises e gerenciar usuários do sistema.

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo SDK 50** - Plataforma de desenvolvimento
- **React Navigation** - Navegação entre telas
- **Expo Linear Gradient** - Gradientes e efeitos visuais
- **Expo Camera** - Funcionalidades de câmera
- **Expo Location** - Serviços de localização
- **Expo Image Picker** - Seleção de imagen
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
│   │   ├── BeehiveListScreen.js │   ├── BeehiveEditScreen.js
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
- 
## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
