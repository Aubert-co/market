import autocannon from 'autocannon'
const url = 'http://localhost:8000/register' 

const instance = autocannon({
  url,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: '123456'
  }),
  connections: 50,
  duration: 20,    
}, finishedBench)

function finishedBench(err:any, res:any) {
  if (err) {
    console.error('Erro durante o teste:', err)
    return
  }

  console.log('Teste finalizado')
  console.log('Resumo:', res)
}

autocannon.track(instance, { renderProgressBar: true })
