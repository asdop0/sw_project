pipeline {
    agent any

    environment {
        TARGET_SERVICE = ""
    }

    stages {
        stage('Trigger Check') {
            steps {
                script {
                    env.TRIGGER_CAUSE = currentBuild.getBuildCauses()[0].shortDescription
                    if (env.TRIGGER_CAUSE.contains("GitHub push")) {
                        env.TARGET_SERVICE = "specific-service"
                        echo "Triggered by GitHub Push"
                    } else if (env.TRIGGER_CAUSE.contains("Started by user")) {
                        env.TARGET_SERVICE = "all-services"
                        echo "Triggered by Manual Build"
                    } else {
                        echo env.TRIGGER_CAUSE
                    }
                    echo "TARGET_SERVICE is now: ${env.TARGET_SERVICE}"
                }
            }
        }
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/asdop0/sw_project.git'
            }
        }

        stage('Build Docker Image') {
            when { 
                expression {
                    env.TARGET_SERVICE == "specific-service" || env.TARGET_SERVICE == "all-services"
                }
            }
            steps {
                script {
                    env.TRIGGER_CAUSE = currentBuild.getBuildCauses()[0].shortDescription
                    if (env.TRIGGER_CAUSE.contains("GitHub push")) {
                        echo "Triggered by GitHub Push"
                    } else if (env.TRIGGER_CAUSE.contains("Started by user")) {
                        sh "docker build -f ./sw-camping/Dockerfile -t sw-camping-image:latest ./sw-camping"
                        sh "docker build -f ./sw-board/Dockerfile -t sw-board-image:latest ./sw-board"
                        sh "docker build -f ./sw-store/Dockerfile -t sw-store-image:latest ./sw-store"
                        sh "docker build -f ./sw-auth/Dockerfile -t sw-auth-image:latest ./sw-auth"
                        sh "docker build -f ./sw-gateway/Dockerfile -t sw-gateway-image:latest ./sw-gateway"
                        sh "docker build -f ./sw-react/Dockerfile -t sw-react-image:latest ./sw-react"
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
                        withCredentials([string(credentialsId: 'docker-token', variable: 'DOCKER_PASSWORD')]) {
                            sh """
                            echo $DOCKER_PASSWORD | docker login -u cmuname --password-stdin
                            """
                            sh "docker push cmuname/sw-docker/sw-camping-image:latest"
                            sh "docker push cmuname/sw-docker/sw-board-image:latest"
                            sh "docker push cmuname/sw-docker/sw-store-image:latest"
                            sh "docker push cmuname/sw-docker/sw-auth-image:latest"
                            sh "docker push cmuname/sw-docker/sw-gateway-image:latest"
                            sh "docker push cmuname/sw-docker/sw-react-image:latest"
                        }
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
                        withCredentials([string(credentialsId: 'docker-token', variable: 'DOCKER_PASSWORD')]) {
                            sh """
                            echo $DOCKER_PASSWORD | docker login -u cmuname --password-stdin
                            """
                            sh "docker pull cmuname/sw-docker/sw-camping-image:latest"
                            sh "docker pull cmuname/sw-docker/sw-board-image:latest"
                            sh "docker pull cmuname/sw-docker/sw-store-image:latest"
                            sh "docker pull cmuname/sw-docker/sw-auth-image:latest"
                            sh "docker pull cmuname/sw-docker/sw-gateway-image:latest"
                            sh "docker pull cmuname/sw-docker/sw-react-image:latest"
                        }
                        echo "Triggered by Manual Build"
                    } else {
                        echo env.TRIGGER_CAUSE
                    }
                }
            }
        }

        stage('Run Docker Compose') {
            when {
                expression {
                    env.TARGET_SERVICE == "all-services"
                }
            }
            steps {
                sh """
                docker-compose down || true
                docker-compose up -d
                """
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
        success {
            echo "TARGET_SERVICE is now: ${env.TARGET_SERVICE}"
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed.'
        }
    }
}
