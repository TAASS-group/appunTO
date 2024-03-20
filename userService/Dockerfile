FROM amazoncorretto:21
WORKDIR /app
ARG firebase_service_account_file
COPY target/*.jar app.jar
COPY $firebase_service_account_file .
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/$firebase_service_account_file"
ENTRYPOINT ["java","-jar","app.jar"]