pipeline {
    agent any
    options {
        timeout(time: 5, unit: 'MINUTES' )
    }

    stages {
	stage('Transfering Files') {
	    steps {
	            sh 'rsync -avz /var/lib/jenkins/workspace/Kanvas-Image-Resizer/ kanvas-image:/home/ubuntu/kanvas-image-resizer/'
               } 
	    }
    
       stage('Starting kanvas-image-resizer') {
	    steps {
                sshagent(['kanvas-image']) {
                    sh 'ssh -tt kanvas-image sudo docker-compose -f kanvas-image-resizer/docker-compose.yml up -d --build'
                }
            }
        }
    }
}
