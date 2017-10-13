FROM openjdk:8-jdk
VOLUME /tmp
ADD pdf-ebinterface-backend/target/pdf-ebinterface-backend-1.0-SNAPSHOT.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar
