FROM maven:3.9.7-amazoncorretto-21-debian-bookworm AS builder

WORKDIR /usr/src/sw-camping
COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY . .
RUN mvn package

FROM amazoncorretto:21.0.3

WORKDIR /app
COPY --from=builder /usr/src/sw-camping/target/sw-camping-0.0.1-SNAPSHOT.jar .

ENTRYPOINT ["java", "-jar", "/app/sw-camping-0.0.1-SNAPSHOT.jar"]