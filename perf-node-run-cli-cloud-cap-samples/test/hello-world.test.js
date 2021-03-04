
describe('Hello world!', () => {
  const { GET, expect } = require('./capire').launch('cds serve', __dirname+'/../hello/world.cds', '')

  it('should say hello with class impl', async () => {
    const {data} = await GET `/say/hello(to='world')`
    expect(data.value).to.eql('Hello world!')
  })

  it('should say hello with another impl', async () => {
    const cds = require ('@sap/cds')
    cds.serve('say').from(cds.model)
    .at('/say-again').in(cds.app)
    .with(srv => {
      srv.on('hello', (req) => `Hello again ${req.data.to}!`)
    })
    const {data} = await GET `/say-again/hello(to='world')`
    expect(data.value).to.eql('Hello again world!')
  })

})
