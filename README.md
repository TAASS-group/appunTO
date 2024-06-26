# appunTO
Documentazione per il progetto di tecniche e archietture avanzate per lo sviluppo software, a.a. 2023/2024

**Autori**: Andrea Delmastro, Mattia Mondino, Simone Multari, Loris Signoretti 

## Struttura del progetto
Il progetto ha la seguente struttura:
```
appunTO
└─── backend [modulo]
     └─── apiGateway [modulo]
     └─── courseService [modulo]
     └─── eurekaServer [modulo]
     └─── fileService [modulo]
     └─── formuService [module]
     └─── messageService [module]
     └─── userService [modulo]
```
dove gni modulo ha la seguente struttura:
```
src [sorgenti]
target [eseguibili]
Dockerfile
pom.xml
```
all'interno di una gerarchia Maven.

## Compilazione
Nella cartella `backend` eseguire il comando `build.ps1` (Windows) - `build.sh` (Linux/MacOS). Entrambi i metodi 
sfruttano il Maven wrapper `mvnw`.

## Utilizzo e installazione
### Tramite Docker compose
Nella cartella `deploy/docker` eseguire `compose_run.ps1` (Windows) - `compose_run.sh` (Linux/MacOS) dopo aver eseguito
la compilazione dei sorgenti (si veda la sezione compilazione). Il file compose è pensato per essere utilizzato in fase
di sviluppo ed espone le porte per tutti i microservizi.

### Tramite Kubernetes
Nella cartella `deploy/kubernetes` eseguire `kubernetes_run.ps1` (Windows) - `kubernetes_run.sh` (Linux/MacOS) dopo aver
eseguito al compilazione dei sorgenti (si veda la sezione compilazione). Per fermare il cluster kubernetes eseguire
`kubernetes_stop.ps1` (Windows) - `kubernetes_run.sh` (Linux/MacOS). Le configurazioni contenute in `config/` sono pensate per
utilizzare immagini proveniente da un repository locale, per cui si consiglia l'utilizzo di Kubernetes in Docker desktop.