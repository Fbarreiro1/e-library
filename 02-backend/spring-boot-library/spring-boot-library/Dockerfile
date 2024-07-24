# Fase 1: Build
FROM openjdk:21-jdk-slim AS build

# Instalar Maven
RUN apt-get update && \
    apt-get install -y wget unzip && \
    wget https://dlcdn.apache.org/maven/maven-3/3.9.4/binaries/apache-maven-3.9.4-bin.zip && \
    unzip apache-maven-3.9.4-bin.zip -d /opt && \
    ln -s /opt/apache-maven-3.9.4/bin/mvn /usr/bin/mvn

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo POM y las dependencias
COPY pom.xml .
COPY src ./src

# Construir el proyecto
RUN mvn clean package -DskipTests

# Fase 2: Runtime
FROM openjdk:21-jdk-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el JAR desde la fase de build
COPY --from=build /app/target/spring-boot-library-0.0.1-SNAPSHOT.jar .

# Comando para ejecutar el JAR
ENTRYPOINT ["java", "-jar", "spring-boot-library-0.0.1-SNAPSHOT.jar"]
