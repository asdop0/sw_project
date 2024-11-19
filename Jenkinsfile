pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/asdop0/sw_project.git'
            }
        }

        stage('Docker Login'){
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-token', 
                                                usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', 
                                                passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                    sh """
                    echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin
                    """
                }
            }
      }

        stage('Build Docker Image') {
            steps {
                dir('sw-react') { 
                    sh 'npm install'
                }
                sh "docker build -f ./sw-camping/Dockerfile -t sw-camping-image:latest ./sw-camping"
                sh "docker build -f ./sw-board/Dockerfile -t sw-board-image:latest ./sw-board"
                sh "docker build -f ./sw-store/Dockerfile -t sw-store-image:latest ./sw-store"
                sh "docker build -f ./sw-auth/Dockerfile -t sw-auth-image:latest ./sw-auth"
                sh "docker build -f ./sw-gateway/Dockerfile -t sw-gateway-image:latest ./sw-gateway"
                echo "Triggered by Manual Build"
                sh "docker tag sw-camping-image:latest cmuname/sw-docker:camping"
                sh "docker tag sw-board-image:latest cmuname/sw-docker:board"
                sh "docker tag sw-store-image:latest cmuname/sw-docker:store"
                sh "docker tag sw-auth-image:latest cmuname/sw-docker:auth"
                sh "docker tag sw-gateway-image:latest cmuname/sw-docker:gateway"
            }
        }

        stage('Push Docker Image') {
            steps{
                sh "docker push cmuname/sw-docker:camping"
                sh "docker push cmuname/sw-docker:board"
                sh "docker push cmuname/sw-docker:store"
                sh "docker push cmuname/sw-docker:auth"
                sh "docker push cmuname/sw-docker:gateway"
                echo "Triggered by Manual Build"
            }
        }

        stage('Pull Docker Image') {
            steps{
                script {
                    try {
                        def pid = sh(script: "lsof -t -i:5173", returnStdout: true).trim()
                        echo "Port 5173 is in use by process ID: ${pid}"
                        sh "kill ${pid}"
                        echo "Process on port 5173 killed."
                    } catch (Exception e) {
                        echo "Port 5173 is not in use."
                    }
                }
                dir('sw-react') { 
                    sh 'npm run dev &'
                }
                sh "docker pull cmuname/sw-docker:camping"
                sh "docker pull cmuname/sw-docker:board"
                sh "docker pull cmuname/sw-docker:store"
                sh "docker pull cmuname/sw-docker:auth"
                sh "docker pull cmuname/sw-docker:gateway"
            }
        }

        stage('Run Docker Compose') {
            steps {
                sh "docker-compose down"
                sh "docker-compose up -d"
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
