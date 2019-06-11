pipeline {
  agent any
  stages {
    stage('status') { steps { sh 'ls -la' } }
    stage('Install dependencies') { steps { sh '''npm install ''' } }
    stage ('Build Project' ) {
      parallel {
        stage('Build Develop Environment') {
          when{ branch 'dev' }
          steps { sh ''' ng build ''' } 
        }
        stage('Build Production Environment') {
          when{ branch 'master' }
          steps { sh ''' ng build --prod''' } 
        }
      }
    }
    stage ('Deploy Project' ) {
      parallel {
        stage('Deploy Develop Environment') {
          when{ branch 'dev' }
            steps { sh '''
              aws s3 rm s3://dev.streamedu.eu --recursive
              aws s3 sync ./dist/streamedu s3://dev.streamedu.eu --acl public-read --cache-control "public, max-age=60"
              aws s3api copy-object --copy-source dev.streamedu.eu/index.html --cache-control "public, max-age=60" --content-type "text/html" --bucket dev.streamedu.eu --key index.html --metadata-directive="REPLACE"
              aws configure set preview.cloudfront true
              aws cloudfront create-invalidation --distribution-id=E2OBWN1AFE4OTK --paths /index.html
            '''}
        }
        stage('Deploy Production Environment') {
          when{ branch 'master' }
            steps { sh '''
                aws s3 rm s3://streamedu.eu --recursive
                aws s3 sync ./dist/streamedu s3://streamedu.eu --acl public-read --cache-control "public, max-age=60"
                aws s3api copy-object --copy-source streamedu.eu/index.html --cache-control "public, max-age=60" --content-type "text/html" --bucket streamedu.eu --key index.html --metadata-directive="REPLACE"
                aws configure set preview.cloudfront true
                aws cloudfront create-invalidation --distribution-id=E30EJUDXQG8X4G --paths /index.html
              '''}
          }
        }
    }    
    stage('Clean Workspace') {
      steps {
        cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, cleanupMatrixParent: true, deleteDirs: true, disableDeferredWipeout: true)
      }
    }
  }
}


