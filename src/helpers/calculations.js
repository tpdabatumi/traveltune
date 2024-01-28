export const calculatePersonality = (personalities, answers) => {
  const frequent = mostFrequentValue(getKeywordsByType(answers, "personality"));

  let result = {};
  personalities.map((personality) => {
    if (personality.keyword === frequent) result = personality;
  });

  return {
    result,
    keyword: frequent,
  };
};

export const calculateFood = (answers) =>
  mostFrequentValue(getKeywordsByType(answers, "food"));
export const calculateAccommodation = (answers) =>
  mostFrequentValue(getKeywordsByType(answers, "accommodation"));
export const calculateBudget = (answers) =>
  mostFrequentValue(getKeywordsByType(answers, "budget"));
export const calculateSocial = (answers) =>
  mostFrequentValue(getKeywordsByType(answers, "social"));
export const calculateDuration = (answers) =>
  mostFrequentValue(getKeywordsByType(answers, "duration"));
export const calculateSeason = (answers) =>
  mostFrequentValue(getKeywordsByType(answers, "season"));

const mostFrequentValue = (keywords) => {
  let count = {};
  for (let i = 0; i < keywords.length; i++) {
    let value = keywords[i];

    if (!count[value]) {
      count[value] = 1;
    } else {
      count[value]++;
    }
  }

  let mostFrequent;
  let max = 0;
  for (let key in count) {
    if (count[key] > max) {
      mostFrequent = key;
      max = count[key];
    }
  }

  return mostFrequent;
};

const getKeywordsByType = (answers, type) => {
  const keywords = [];

  answers.map((answer) => {
    if (answer.type === type)
      answer.keywords.map((keyword) => keywords.push(keyword));
  });

  return keywords;
};
