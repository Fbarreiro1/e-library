# Fase 1: Build
FROM maven:3.8.6-openjdk-21 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de proyecto
COPY pom.xml .
COPY src ./src

# Construir el proyecto
RUN mvn clean package -DskipTests

# Fase 2: Runtime
FROM openjdk:21-jdk-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el JAR construido desde la fase de build
COPY --from=build /app/target/spring-boot-library-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto en el que correrá la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
