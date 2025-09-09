# syntax=docker/dockerfile:1

# ---------- build stage ----------
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# ---------- runtime stage ----------
FROM eclipse-temurin:17-jre-focal
WORKDIR /app
COPY --from=builder /app/target/tripweather-0.0.1-SNAPSHOT.jar /app/tripweather-service.jar

EXPOSE 9095

# Usa CMD en lugar de ENTRYPOINT para que las variables de entorno se lean correctamente.
# La propiedad --spring.config.import le dice a Spring que lea del archivo de propiedades especificado.
CMD ["java", "-jar", "tripweather-service.jar"]