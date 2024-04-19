# appunTO
Documentazione per il progetto di tecniche e archietture avanzate per lo sviluppo software, a.a. 2023/2024

**Autori**: Andrea Delmastro, Mattia Mondino, Simone Multari, Loris Signoretti 

## Struttura del progetto
Il progetto ha la seguente struttura:
```
appunTO
└─── backend [modulo]
     └─── apiGateway [modulo]
     └─── eurekaServer [modulo]
     └─── fileService [modulo]
     └─── userService [modulo]
     └─── rabbitMQ
```
dove i moduli Maven sono organizzati secondo una struttura gerarchica di pom file.

## Compilazione
Per compilare i sorgenti è necessario eseguire il comando `build.ps1` (Windows) - `build.sh` (Linux/MacOS). Entrambi i metodi sfruttano il Maven wrapper.

## Utilizzo e installazione
### Tramite Docker compose
Per eseguire l'applicazione tramite Docker è necessario eseguire gli script contenuti nella cartella `deploy/docker`:
* `compose_run.ps1` (Windows) - `compose_run.sh` (Linux/MacOs): crea i container sulla base delle immagini scaricate da Docker hub
* `compose_dev_run.ps1 [SERVICE...]` (Windows) - `compose_dev_run.sh [SERVICE...]` (Linux/MacOs): crea i container sulla base delle immagini di cui esegue la build localmente. Può essere specificata la lista dei microservizi da avviare (escluso `eurekaserver-app`, che è necessario e viene avviato di default). Da esguire successivamente alla compilazione dei sorgenti, si veda la sezione compilazione. Ad esempio: `./compose_dev_run.ps1 appunto-apigateway-app apputo-userservice-app appunto-ileservice-app`

Gli script fanno riferimento, rispettivamente, a due Compose file contentui nella cartella `deploy/docker/config`:
* `compose.yaml`: il file di produzione, che definisce le dipendenze corrette tra microservizi ed espone le sole porte necessarie alla comunicazione con l'api gateway, unico _entry point_ dell'applicazione. **TODO:** non viene effettuauta la build delle immagini, ma sono scaricate da Docker hub.
* `compose_dev.yaml`: il file di sviluppo, rimuove le dipendenze non necessarie ed espone le porte utili all'esecuzione dei singoli microservizi. Ogni microservizio è contattabile direttamente su una porta assegnatagli. Definisce il processo di build delle immagini.

### Tramite Kubernetes
TODO