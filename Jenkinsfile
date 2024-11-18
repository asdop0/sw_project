pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-token')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/asdop0/sw_project.git'
                echo "$DOCKERHUB_CREDENTIALS_PSW, $DOCKERHUB_CREDENTIALS_USR"
            }
        }

        stage('Docker Login'){
          steps{
            echo "$DOCKERHUB_CREDENTIALS_PSW, $DOCKERHUB_CREDENTIALS_USR"
            bat 'docker login -u $DOCKERHUB_CREDENTIALS_USR'
            bat '$DOCKERHUB_CREDENTIALS_PSW'
          }
      }

        stage('Build Docker Image') {
            steps {
                script {
                    env.TRIGGER_CAUSE = currentBuild.getBuildCauses()[0].shortDescription
                    if (env.TRIGGER_CAUSE.contains("GitHub push")) {
                        echo "Triggered by GitHub Push"
                    } else if (env.TRIGGER_CAUSE.contains("Started by user")) {
                        bat "docker build -f ./sw-camping/Dockerfile -t sw-camping-image:latest ./sw-camping"
                        bat "docker build -f ./sw-board/Dockerfile -t sw-board-image:latest ./sw-board"
                        bat "docker build -f ./sw-store/Dockerfile -t sw-store-image:latest ./sw-store"
                        bat "docker build -f ./sw-auth/Dockerfile -t sw-auth-image:latest ./sw-auth"
                        bat "docker build -f ./sw-gateway/Dockerfile -t sw-gateway-image:latest ./sw-gateway"
                        bat "docker build -f ./sw-react/Dockerfile -t sw-react-image:latest ./sw-react"
                        echo "Triggered by Manual Build"
                    } else {
                        echo env.TRIGGER_CAUSE
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps{
                script {
                    env.TRIGGER_CAUSE = currentBuild.getBuildCauses()[0].shortDescription
                    if (env.TRIGGER_CAUSE.contains("GitHub push")) {
                        echo "Triggered by GitHub Push"
                    } else if (env.TRIGGER_CAUSE.contains("Started by user")) {
                        bat "echo $DOCKER_PASSWORD | docker login -u cmuname --password-stdin"
                        bat "docker push cmuname/sw-docker/sw-camping-image:latest"
                        bat "docker push cmuname/sw-docker/sw-board-image:latest"
                        bat "docker push cmuname/sw-docker/sw-store-image:latest"
                        bat "docker push cmuname/sw-docker/sw-auth-image:latest"
                        bat "docker push cmuname/sw-docker/sw-gateway-image:latest"
                        bat "docker push cmuname/sw-docker/sw-react-image:latest"
                        echo "Triggered by Manual Build"
                    } else {
                        echo env.TRIGGER_CAUSE
                    }
                }
            }
        }

        stage('Pull Docker Image') {
            steps{
                script {
                    env.TRIGGER_CAUSE = currentBuild.getBuildCauses()[0].shortDescription
                    if (env.TRIGGER_CAUSE.contains("GitHub push")) {
                        echo "Triggered by GitHub Push"
                    } else if (env.TRIGGER_CAUSE.contains("Started by user")) {
                        echo "Triggered by Manual Build"
                        bat "echo $DOCKER_PASSWORD | docker login -u cmuname --password-stdin"
                        bat "docker pull cmuname/sw-docker/sw-camping-image:latest"
                        bat "docker pull cmuname/sw-docker/sw-board-image:latest"
                        bat "docker pull cmuname/sw-docker/sw-store-image:latest"
                        bat "docker pull cmuname/sw-docker/sw-auth-image:latest"
                        bat "docker pull cmuname/sw-docker/sw-gateway-image:latest"
                        bat "docker pull cmuname/sw-docker/sw-react-image:latest"
                        echo "Triggered by Manual Build"
                    } else {
                        echo env.TRIGGER_CAUSE
                    }
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    env.TRIGGER_CAUSE = currentBuild.getBuildCauses()[0].shortDescription
                    if (env.TRIGGER_CAUSE.contains("GitHub push")) {
                        echo "Triggered by GitHub Push"
                    } else if (env.TRIGGER_CAUSE.contains("Started by user")) {
                        bat "docker-compose up -d"
                    } else {
                        echo env.TRIGGER_CAUSE
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed.'
        }
    }
}
