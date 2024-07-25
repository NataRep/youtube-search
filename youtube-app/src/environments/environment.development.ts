export const environment: Environment = {
  //apiKey: 'AIzaSyBBHFaEB3gnBsfTDdjRsCb1uxEs87VRnyY',
  apiUrl: `https://www.googleapis.com/youtube/v3`,
  apiKey: `AIzaSyBqCik0stmr7QP6W5eMCVmS9zyqBNPRu7A`,
  apiKeyAlternative: 'AIzaSyBBHFaEB3gnBsfTDdjRsCb1uxEs87VRnyY',
};

interface Environment {
  apiKey: string;
  apiUrl: string;
  apiKeyAlternative: string;
}
