# Start with a base image that includes a Java Runtime Environment (JRE)
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file of the application into the container.
COPY target/tripweather-0.0.1-SNAPSHOT.jar /app/tripweather-service.jar
# Expose the port on which the Spring Boot application will run
EXPOSE 9095

# Command to run the application when the container starts
ENTRYPOINT ["java", "-jar", "tripweather-service.jar"]