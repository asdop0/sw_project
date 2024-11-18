FROM maven:3.9.7-amazoncorretto-21-debian-bookworm AS builder

WORKDIR /usr/src/sw-board
COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY . .
RUN mvn package

FROM amazoncorretto:21.0.3

WORKDIR /app
COPY --from=builder /usr/src/sw-board/target/sw-board-0.0.1-SNAPSHOT.jar .

ENTRYPOINT ["java", "-jar", "/app/sw-board-0.0.1-SNAPSHOT.jar"]