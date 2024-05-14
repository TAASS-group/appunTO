# Image for building inside container using maven wrapper
# Needs maven wrapper files in directory
FROM amazoncorretto:21
WORKDIR /app
ARG firebase_service_account_file
COPY .mvn mvnw/ pom.xml src/ $firebase_service_account_file ./
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/$firebase_service_account_file"
RUN ./mvnw install -DskipTests
ENTRYPOINT ["java","-jar","target/app.jar"]