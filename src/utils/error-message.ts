// Fonction qui retourne le message d'erreur à afficher
export function getErrorMessage(title: string, hidden = false): string {
  return `(Élément ${hidden ? "caché " : ""}de type ${title} mal rempli)`;
}
