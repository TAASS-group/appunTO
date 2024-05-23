# Per genereare i file di configurazione tramite kompose:
# kompose convert -f compose.yaml -o config/

docker compose -p appunto -f compose.yaml build
kubectl apply -f ./config

# Per eseguire il port forward
Start-Sleep -seconds 20
kubectl port-forward service/messageservice-app 8080:8085 > /dev/null &

# kubectl port-forward service/userservice-db 5433:5432 > /dev/null &
# kubectl port-forward service/eurekaserver-app 8761:8761 > /dev/null &
# ...

