FROM amazoncorretto:21
WORKDIR /app
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]