const fs = require("fs");

// Chargement des données des jeux depuis un fichier JSON
const jeux = JSON.parse(fs.readFileSync("./assets/data.json"));

// Fonction pour trouver un jeu par son nom
function trouverJeuParNom(nom) {
  return jeux.find((jeu) => jeu.Name.toLowerCase() === nom.toLowerCase());
}

// Fonction pour recommander des jeux basés sur les données d'un jeu donné
function recommanderJeux(jeu) {
  const similarite = {}; // Similarité des jeux avec le jeu donné

  // Calcul de la similarité avec chaque jeu
  for (let j of jeux) {
    if (j !== jeu) {
      // Ignorer le jeu donné
      let score = 0;

      // Comparaison des données de jeu
      if (
        Number(j.MinPlayers) <= Number(jeu.MaxPlayers) &&
        Number(j.MaxPlayers) >= Number(jeu.MinPlayers)
      ) {
        score++;
      }
      if (
        Number(j.PlayTime) <= Number(jeu.PlayTime) * 1.5 &&
        Number(j.PlayTime) >= Number(jeu.PlayTime) * 0.5
      ) {
        score++;
      }
      if (
        Number(j.ComplexityAverage) <= Number(jeu.ComplexityAverage) * 1.5 &&
        Number(j.ComplexityAverage) >= Number(jeu.ComplexityAverage) * 0.5
      ) {
        score += 2;
      }
      if (
        j.Mechanics.split(", ").some((m) =>
          jeu.Mechanics.split(", ").includes(m)
        )
      ) {
        score++;
      }
      if (
        j.Domains.split(", ").some((d) => jeu.Domains.split(", ").includes(d))
      ) {
        score += 2;
      }

      similarite[j.ID] = score; // Enregistrement du score de similarité
    }
  }

  // Tri des jeux en fonction de leur similarité avec le jeu donné
  const recommandations = Object.keys(similarite)
    .sort((a, b) => similarite[b] - similarite[a])
    .slice(0, 5) // Limiter le nombre de recommandations à 5
    .map((id) => jeux.find((j) => j.ID === id));

  return recommandations;
}

// Demander à l'utilisateur d'entrer le nom d'un jeu
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Entrez le nom d'un jeu : ", (nom) => {
  const jeu = trouverJeuParNom(nom);

  if (jeu) {
    const recommandations = recommanderJeux(jeu);
    console.log(recommandations);

    console.log(`Top 5 des jeux recommandés pour ${jeu.Name} :`);
    recommandations.forEach((r, i) =>
      console.log(`${i + 1}. ${r.Name}   ID: ${r.ID}`)
    );
  } else {
    console.log(`Aucun jeu trouvé avec le nom ${nom}.`);
  }

  rl.close();
});
