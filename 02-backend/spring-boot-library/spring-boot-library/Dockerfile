# Usa una imagen base con Java 21
FROM openjdk:21-jdk AS build

# Configura el directorio de trabajo
WORKDIR /app

# Copia el archivo pom.xml y el código fuente
COPY pom.xml ./
COPY src ./src

# Ejecuta Maven para construir el proyecto
RUN mvn clean package -DskipTests

# Usa una imagen base más ligera para ejecutar la aplicación
FROM openjdk:21-jdk

# Configura el directorio de trabajo
WORKDIR /app

# Copia el archivo JAR generado desde la imagen de construcción
COPY --from=build /app/target/spring-boot-library.jar ./app.jar

# Expon el puerto en el que la aplicación escuchará
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]
