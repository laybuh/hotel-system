FROM maven:3.9-eclipse-temurin-17-alpine AS build
RUN apk add --no-cache nodejs npm
RUN npm install -g @angular/cli
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /app/target/D387_sample_code-0.0.2-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]