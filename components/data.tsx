export const AboutData =[
    {
        cardNumber:'01',
        cardTitle:'Innovation Spotlight',
        cardText:'To shine a spotlight on innovative projects, providing a dedicated platform to showcase unique value propositions and capture the attention of potential investors.'
    },
    {
        cardNumber:'02',
        cardTitle:'Collaborative Community Engagemen',
        cardText:' Drive active community participation by allowing users to engage directly with projects through interactive discussions, Q&A sessions, and real-time updates, creating a strong sense of community around each launch.'
    },
    {
        cardNumber:'03',
        cardTitle:'In-Depth Insights',
        cardText:'Projects benefit from comprehensive project profiles that offer detailed information about the team, technology, roadmap, and tokenomics, helping investors make informed decisions based on transparent and reliable data.'
    },
    {
        cardNumber:'04',
        cardTitle:'Strategic Marketing Support',
        cardText:'Empowering projects with strategic marketing initiatives, including targeted promotion, social media exposure, and partnership opportunities, ensuring maximum visibility and traction during the launch phase.'
    },
]

export const HowToBuyData = [
    {
      id: 1,
      stepTag: 'STEP ONE',
      cardHeading: 'Create a MetaMask Wallet',
      cardText: 'Create a Metask wallet on a computer or iOS/Android.',
    },
    {
      id: 2,
      stepTag: 'STEP TWO',
      cardHeading: 'Add Nautilus Chain RPC to MetaMask',
      cardText: (
        <span >
          Go{' '}
          <a  style={{color:'#03FBFC',cursor:'pointer'}} title="Addd Network" href='https://t.me/dyleumann/124' rel='noreferrer'target='_blank'>
            here
          </a>{' '}
          to see RPC information and click "add network" on MetaMask.
        </span>
      ),
    },
    {
      id: 3,
      stepTag: 'STEP THREE',
      cardHeading: 'Send $ZBC to Created Wallet',
      cardText: 'You can buy $ZBC from exchanges like Gate.io, etc.',
    },
    {
      id: 4,
      stepTag: 'STEP FOUR',
      cardHeading: 'Connect Wallet to Participate.',
      cardText: (
        <span>
          By clicking "Connect Wallet" on our Launchpad DApp, your wallet
          connects and it is ready to swap.
        </span>
      ),
    },
  ];

  export const CardStatus =[
    {
      id:1,
      stat:'Audit'
    },
    {
      id:2,
      stat:'KYC'
    },
    {
      id:3,
      stat:'Verified'
    },
    {
      id:3,
      stat:'Audit'
    },
  ]
  