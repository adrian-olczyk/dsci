# DSCI (Dead Simple CI)

### Instalacja

    npm install
    
### Konfiguracja

Struktura katalogów:

```
projects/
├── project-dir/
    ├── config.json
    ├── before.sh
    ├── build.sh
    ├── test.sh
    └── deploy.sh
```

config.json:

```json
{
  // powinna odpowiadać nazwie na GH
  "name": "org/repo-name",
  
  // adres repozytorium na GH
  "repository": "git@github.com:org/repo-name.git"
}
```

Skrypty `before.sh`, `build.sh`, `test.sh` i `deploy.sh` uruchamiane są sekwencyjnie, a ich rootem jest sklonowane repozytorium.

### Uruchomienie

#### 1. Serwer oczekujący na powiadomienia z GH

    node server.js
    
Na GH w repozytorium należy dodać hooka (Sekcja Webhooks w ustawieniach). Adres to `http://adres.dsci/gh/hook`. Skrypty będą odpalane po każdym pushu do repozytorium.

#### 2. Pojedyncze uruchomienie projektu

    node run.js <nazwa-projektu>
    
_Nazwa projektu powinna odpowiadać tej, która znajduje się w `config.json`_
    