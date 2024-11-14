pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // GitHub에서 코드 클론
                git branch: 'main', credentialsId: 'github_credentials', url: '{REPOSITORY URL}'
            }
        }

        stage('Check for Changes in Project sw-auth') {
            steps {
                script {
                    // sw-auth 디렉토리의 변경사항 확인
                    def changes = sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-auth/'", returnStdout: true).trim()
                    if (changes) {
                        currentBuild.result = 'SUCCESS'
                        echo 'Changes detected in sw-auth. Proceeding with build and deploy.'
                    } else {
                        echo 'No changes in sw-auth. Skipping build and deploy.'
                        currentBuild.result = 'SUCCESS'
                    }
                }
            }
        }

        stage('Build and Test sw-auth') {
            when {
                expression { return currentBuild.result == 'SUCCESS' && sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-auth/'", returnStdout: true).trim() != '' }
            }
            steps {
                echo 'Building and Testing sw-auth...'
                dir('sw-auth') {
                    sh './mvnw clean package'
                    sh './mvnw test'
                }
            }
        }

        stage('Deploy sw-auth') {
            when {
                expression { return currentBuild.result == 'SUCCESS' && sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-auth/'", returnStdout: true).trim() != '' }
            }
            steps {
                echo 'Deploying sw-auth...'
                dir('sw-auth') {
                    sh 'java -jar target/*.jar'
                }
            }
        }

        stage('Check for Changes in Project sw-board') {
            steps {
                script {
                    // sw-board 디렉토리의 변경사항 확인
                    def changes = sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-board/'", returnStdout: true).trim()
                    if (changes) {
                        currentBuild.result = 'SUCCESS'
                        echo 'Changes detected in sw-board. Proceeding with build and deploy.'
                    } else {
                        echo 'No changes in sw-board. Skipping build and deploy.'
                        currentBuild.result = 'SUCCESS'
                    }
                }
            }
        }

        stage('Build and Test sw-board') {
            when {
                expression { return currentBuild.result == 'SUCCESS' && sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-board/'", returnStdout: true).trim() != '' }
            }
            steps {
                echo 'Building and Testing sw-board...'
                dir('sw-board') {
                    sh './mvnw clean package'
                    sh './mvnw test'
                }
            }
        }

        stage('Deploy sw-board') {
            when {
                expression { return currentBuild.result == 'SUCCESS' && sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-board/'", returnStdout: true).trim() != '' }
            }
            steps {
                echo 'Deploying sw-board...'
                dir('sw-board') {
                    sh 'java -jar target/*.jar'
                }
            }
        }

        stage('Check for Changes in Project sw-camping') {
            steps {
                script {
                    // sw-camping 디렉토리의 변경사항 확인
                    def changes = sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-camping/'", returnStdout: true).trim()
                    if (changes) {
                        currentBuild.result = 'SUCCESS'
                        echo 'Changes detected in sw-camping. Proceeding with build and deploy.'
                    } else {
                        echo 'No changes in sw-camping. Skipping build and deploy.'
                        currentBuild.result = 'SUCCESS'
                    }
                }
            }
        }

        stage('Build and Test sw-camping') {
            when {
                expression { return currentBuild.result == 'SUCCESS' && sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-camping/'", returnStdout: true).trim() != '' }
            }
            steps {
                echo 'Building and Testing sw-camping...'
                dir('sw-camping') {
                    sh './mvnw clean package'
                    sh './mvnw test'
                }
            }
        }

        stage('Deploy sw-camping') {
            when {
                expression { return currentBuild.result == 'SUCCESS' && sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-camping/'", returnStdout: true).trim() != '' }
            }
            steps {
                echo 'Deploying sw-camping...'
                dir('sw-camping') {
                    sh 'java -jar target/*.jar'
                }
            }
        }

        stage('Check for Changes in Project sw-store') {
            steps {
                script {
                    // sw-store 디렉토리의 변경사항 확인
                    def changes = sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-store/'", returnStdout: true).trim()
                    if (changes) {
                        currentBuild.result = 'SUCCESS'
                        echo 'Changes detected in sw-store. Proceeding with build and deploy.'
                    } else {
                        echo 'No changes in sw-store. Skipping build and deploy.'
                        currentBuild.result = 'SUCCESS'
                    }
                }
            }
        }

        stage('Build and Test sw-store') {
            when {
                expression { return currentBuild.result == 'SUCCESS' && sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-store/'", returnStdout: true).trim() != '' }
            }
            steps {
                echo 'Building and Testing sw-store...'
                dir('sw-store') {
                    sh './mvnw clean package'
                    sh './mvnw test'
                }
            }
        }

        stage('Deploy sw-store') {
            when {
                expression { return currentBuild.result == 'SUCCESS' && sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-store/'", returnStdout: true).trim() != '' }
            }
            steps {
                echo 'Deploying sw-store...'
                dir('sw-store') {
                    sh 'java -jar target/*.jar'
                }
            }
        }

        stage('Check for Changes in Project sw-gateway') {
            steps {
                script {
                    // sw-gateway 디렉토리의 변경사항 확인
                    def changes = sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-gateway/'", returnStdout: true).trim()
                    if (changes) {
                        currentBuild.result = 'SUCCESS'
                        echo 'Changes detected in sw-gateway. Proceeding with build and deploy.'
                    } else {
                        echo 'No changes in sw-gateway. Skipping build and deploy.'
                        currentBuild.result = 'SUCCESS'
                    }
                }
            }
        }

        stage('Build and Test sw-gateway') {
            when {
                expression { return currentBuild.result == 'SUCCESS' && sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-gateway/'", returnStdout: true).trim() != '' }
            }
            steps {
                echo 'Building and Testing sw-gateway...'
                dir('sw-gateway') {
                    sh './mvnw clean package'
                    sh './mvnw test'
                }
            }
        }

        stage('Deploy sw-gateway') {
            when {
                expression { return currentBuild.result == 'SUCCESS' && sh(script: "git diff --name-only HEAD~1 HEAD | grep '^sw-gateway/'", returnStdout: true).trim() != '' }
            }
            steps {
                echo 'Deploying sw-gateway...'
                dir('sw-gateway') {
                    sh 'java -jar target/*.jar'
                }
            }
        }
    }
}
