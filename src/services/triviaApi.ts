// Trivia API service with normalization and fallback
export interface Question {
  id: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizSettings {
  category: string;
  difficulty: string;
  amount: string;
  timePerQuestion: string;
}

// Decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Normalize API response to our Question interface
const normalizeQuestion = (apiQuestion: any, index: number): Question => {
  const incorrectAnswers = apiQuestion.incorrect_answers.map(decodeHtmlEntities);
  const correctAnswer = decodeHtmlEntities(apiQuestion.correct_answer);
  
  // Create array of all options and shuffle them
  const allOptions = [...incorrectAnswers, correctAnswer];
  const shuffledOptions = shuffleArray(allOptions);
  
  // Find the index of the correct answer in the shuffled array
  const correctIndex = shuffledOptions.indexOf(correctAnswer);

  return {
    id: `question-${index}`,
    category: decodeHtmlEntities(apiQuestion.category),
    difficulty: apiQuestion.difficulty as 'easy' | 'medium' | 'hard',
    question: decodeHtmlEntities(apiQuestion.question),
    options: shuffledOptions,
    correctIndex,
    explanation: undefined // API doesn't provide explanations
  };
};

// Fallback questions for offline use
const fallbackQuestions: Question[] = [
  {
    id: "fallback-1",
    category: "General Knowledge",
    difficulty: "medium",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctIndex: 2,
    explanation: "Paris has been the capital of France since 987 AD."
  },
  {
    id: "fallback-2",
    category: "Science & Nature",
    difficulty: "easy",
    question: "How many hearts does an octopus have?",
    options: ["One", "Two", "Three", "Four"],
    correctIndex: 2,
    explanation: "Octopuses have three hearts: two pump blood to the gills, and one pumps blood to the rest of the body."
  },
  {
    id: "fallback-3",
    category: "Entertainment: Film",
    difficulty: "medium",
    question: "Which movie won the Academy Award for Best Picture in 2020?",
    options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
    correctIndex: 2,
    explanation: "Parasite made history as the first non-English language film to win Best Picture."
  },
  {
    id: "fallback-4",
    category: "Geography",
    difficulty: "hard",
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctIndex: 1,
    explanation: "Vatican City covers only 0.17 square miles (0.44 square kilometers)."
  },
  {
    id: "fallback-5",
    category: "History",
    difficulty: "medium",
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctIndex: 1,
    explanation: "World War II ended in 1945 with the surrender of Japan on September 2, 1945."
  }
];

// Fetch questions from Open Trivia DB
export const fetchQuestions = async (settings: QuizSettings): Promise<Question[]> => {
  try {
    const url = `https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error('API returned error code');
    }
    
    return data.results.map(normalizeQuestion);
  } catch (error) {
    console.warn('Failed to fetch questions from API, using fallback questions:', error);
    
    // Return shuffled fallback questions limited to requested amount
    const shuffled = shuffleArray(fallbackQuestions);
    const amount = parseInt(settings.amount);
    return shuffled.slice(0, Math.min(amount, shuffled.length));
  }
};

// Get available categories
export const getCategories = () => {
  return [
    { id: "9", name: "General Knowledge" },
    { id: "10", name: "Entertainment: Books" },
    { id: "11", name: "Entertainment: Film" },
    { id: "12", name: "Entertainment: Music" },
    { id: "17", name: "Science & Nature" },
    { id: "18", name: "Science: Computers" },
    { id: "19", name: "Science: Mathematics" },
    { id: "20", name: "Mythology" },
    { id: "21", name: "Sports" },
    { id: "22", name: "Geography" },
    { id: "23", name: "History" },
    { id: "24", name: "Politics" },
    { id: "25", name: "Art" },
  ];
};