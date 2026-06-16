#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 1024

int main(int argc, char *argv[])
{
  if (argc < 2)
  {
    printf("Veuillez fournir un nom\n");
    return 1;
  }

  char *nom = argv[1];

  char dossier[MAX];
  char commande[MAX];
  char fichier[MAX];
  char routes[MAX];
  char buffer[MAX * 2];

  // -------------------------
  // création dossier
  // -------------------------
  snprintf(dossier, sizeof(dossier),
           "/home/adja/Documents/Aly JS/Projet Gym/script/pages/%s",
           nom);

  snprintf(commande, sizeof(commande),
           "mkdir -p \"%s\"",
           dossier);

  system(commande);

  // -------------------------
  // création fichier JS
  // -------------------------
  snprintf(fichier, sizeof(fichier),
           "/%s.js",
           dossier, nom);

  FILE *fp = fopen(fichier, "w");

  if (!fp)
  {
    printf("Erreur création fichier\n");
    return 1;
  }

  fprintf(fp,
          "import { navigate } from '../router.js';\n\n"
          "const %s = async () => {\n\n"
          "}\n\n"
          "%s.afterRender = () => {\n\n"
          "}\n\n"
          "export default %s;\n",
          nom, nom, nom);

  fclose(fp);

  printf("%s.js créé\n", nom);

  // -------------------------
  // ROUTES (équivalent bash + sed)
  // -------------------------
  snprintf(routes, sizeof(routes),
           "/home/adja/Documents/Aly JS/Projet Gym/script/router.js");

  FILE *file = fopen(routes, "r");

  if (!file)
  {
    printf("Erreur: router.js introuvable\n");
    return 1;
  }

  // lire contenu
  char content[MAX * 10] = "";
  char line[MAX];

  while (fgets(line, sizeof(line), file))
  {
    strcat(content, line);
  }

  fclose(file);

  // vérifier si route existe déjà
  char search[MAX];
  snprintf(search, sizeof(search), "\"/%s\"", nom);

  if (strstr(content, search))
  {
    printf("La route existe déjà\n");
    return 0;
  }

  // construire nouvelle route
  snprintf(buffer, sizeof(buffer),
           "    ,\"/%s\": \"%s\"\n};",
           nom, nom);

  // remplacer le premier "};"
  char *pos = strstr(content, "};");

  if (!pos)
  {
    printf("Erreur: fin de routes introuvable\n");
    return 1;
  }

  // reconstruire fichier
  *pos = '\0';

  strcat(content, buffer);

  // réécrire router.js
  file = fopen(routes, "w");

  if (!file)
  {
    printf("Erreur écriture router.js\n");
    return 1;
  }

  fputs(content, file);
  fclose(file);

  printf("Route ajoutée : /%s\n", nom);

  return 0;
}