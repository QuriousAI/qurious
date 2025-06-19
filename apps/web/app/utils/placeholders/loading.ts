export const searchPageLoadingPlaceholders: string[] = [
    // 📚 Academic & Research
    "Fetching peer-reviewed brilliance...",
    "Excavating academic gold...",
    "Assembling citations like Voltron...",
    "Summoning scholarly spirits...",
    "Cracking open the dusty tomes...",
    "Footnotes loading…",
    "Consulting the Library of Babel...",
    "Filtering signal from noise...",
    "P-hacking the truth...",
    "Polishing your hypothesis...",
  
    // 🧠 Data, AI, & Math
    "Running Bayesian inference...",
    "Optimizing your search parameters...",
    "Searching with a 95% confidence interval...",
    "Training the model… on your curiosity",
    "Initiating vector embedding alignment...",
    "Asking GPT for backup...",
    "Cross-validating your query...",
    "Deriving meaning from entropy...",
    "Normalizing the results...",
  
    // 🔬 Science & Lab Vibes
    "Putting on the lab coat...",
    "Stirring the petri dish...",
    "Running experiments on your query...",
    "Microscoping the data...",
    "Compiling results... hope it compiles.",
  ];
  
  export function getRandomSearchPlaceholder(): string {
    const index = Math.floor(
      Math.random() * searchPageLoadingPlaceholders.length,
    );
    return searchPageLoadingPlaceholders[index];
  }
  