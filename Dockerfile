# syntax=docker/dockerfile:1

# ---------- build stage ----------
# Start with a Maven image to compile the application
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# ---------- runtime stage ----------

# Use a smaller JRE image for the final runtime stage
FROM eclipse-temurin:17-jre-focal

# Set the working directory
WORKDIR /app

# Copy the JAR file from the builder stage
COPY --from=builder /app/target/tripweather-0.0.1-SNAPSHOT.jar /app/tripweather-service.jar

# Expose the port on which the Spring Boot application will run
EXPOSE 9095

# Command to run the application when the container starts
ENTRYPOINT ["java", "-jar", "tripweather-service.jar"]