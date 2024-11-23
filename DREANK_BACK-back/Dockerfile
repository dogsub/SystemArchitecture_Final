FROM gradle:7.6.0-jdk17 AS build
WORKDIR /home/gradle/project
COPY --chown=gradle:gradle . .
RUN gradle build --no-daemon

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /home/gradle/project/build/libs/dreank-0.0.1-SNAPSHOT.>
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]