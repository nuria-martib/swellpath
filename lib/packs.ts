import type { CommunitySpot, KnownSpot, Pack } from './types';
// To attach a tutorial video to a step, set its `videoId` to a YouTube
// video id — the part after `v=` in a watch URL (e.g. for
// https://www.youtube.com/watch?v=dQw4w9WgXcQ the id is "dQw4w9WgXcQ").
// Steps without a videoId simply don't show a "Watch tutorial" button.
export const PACKS: Pack[] = [
  {
    id: 'pop-up',
    title: 'Pop-Up Pack',
    maneuver: 'Pop Up',
    tagline: 'The foundation of every wave',
    level: 'beginner',
    order: 1,
    accentColor: 'ocean',
    heroImage: 'popup',
    overview:
      'You can already stand up — now make the pop up flawless. A fast, single-motion pop up buys you the split second that decides whether you make the drop or get pitched. Study the model, then drill the pattern on land until it fires without thought.',
    prerequisites: ['Comfortable paddling', 'Can already stand up on a wave'],
    landSectionTitle: 'Practice on solid ground',
    landSectionSubtitle: 'Drill the pattern on dry land, every session, until it is perfect.',
    guideSectionTitle: 'The pop up, frame by frame',
    guideSectionSubtitle:
      'John John Florence at full speed — study each position, then mirror it on land.',
    steps: [
      {
        id: 'popup-analyse-1',
        kind: 'analyse',
        title: 'Analyse a world-class pop up',
        duration: '10 min',
        image: 'popup-water',
        summary:
          'Before you change anything, build the mental model. Watch the in-water reference at full speed, then slow down and study the eight frames below. You are not learning to stand — you are hunting the small inefficiencies that cost you speed and balance on the drop.',
        cues: [
          'Notice how the hands set under the ribs, not out by the shoulders',
          'Watch the back foot land first, front foot slide in on the same beat',
          'Track the eyes — they are already down the line before the feet land',
        ],
        videoId: 'XYZ46bGfZ08', // in-water pop-up reference
      },
      {
        id: 'popup-land-1',
        kind: 'surfskate',
        title: 'Practice on solid ground',
        duration: '15 min',
        image: 'popup-land',
        summary:
          'Groove the exact pattern you just analysed on a firm, flat surface. No knees, no scramble — one explosive press straight to your riding stance. Repeat it every session until it fires identically every time, so the water just becomes execution.',
        cues: [
          'Hands flat under your ribs, elbows in',
          'Explode from prone to stance in a single motion — never via the knees',
          'Freeze the landing: feet shoulder-width, weight ~60% front, eyes up the line',
        ],
        videoId: '9rz-ucDwjVU', // land practice reference
      },
    ],
    guide: [
      {
        image: 'popup-step-1',
        title: 'Place feet + hold board',
        description:
          'Hands set flat on the rails under the ribs, feet already loading the tail. The base you press from.',
      },
      {
        image: 'popup-step-2',
        title: 'Transfer load + release',
        description:
          'Weight shifts off the chest and into the hands as the board releases down the face. Commit here.',
      },
      {
        image: 'popup-step-3',
        title: 'Commit + set hands',
        description:
          'Hands locked under the ribcage, arms driving. No hesitation — the pop starts the instant you feel glide.',
      },
      {
        image: 'popup-step-4',
        title: 'Balanced press',
        description:
          'An even, explosive press through both hands, chest and hips rising together, board staying flat.',
      },
      {
        image: 'popup-step-5',
        title: 'Create hip clearance',
        description:
          'Hips lift high off the deck to open space for the feet. Low hips are what forces the knee drag.',
      },
      {
        image: 'popup-step-6',
        title: 'Draw knees under',
        description:
          'Back foot drives in first across the stringer, front foot slides in beneath the chest on the same beat.',
      },
      {
        image: 'popup-step-7',
        title: 'Compress + set rail',
        description:
          'Land low and compressed, weight centred, beginning to engage the rail for the first bottom turn.',
      },
      {
        image: 'popup-step-8',
        title: 'Stabilise + drive line',
        description:
          'Stand tall, eyes already down the line, driving the board into a clean, controlled trim.',
      },
    ],
  },
  {
    id: 'bottom-turn',
    title: 'Bottom Turn Pack',
    maneuver: 'Bottom Turn',
    tagline: 'Where all your speed comes from',
    level: 'improver',
    order: 2,
    accentColor: 'seagrass',
    heroImage: 'bottomturn',
    overview:
      'The bottom turn is where all your speed and every manoeuvre begins. You can already ride the face — now sharpen the compression, rail engagement and projection that turn a flat, drifting turn into an explosive one. Study the model in the water, then drill the exact movements on a surfskate until they are automatic.',
    prerequisites: ['Consistent pop up', 'Can ride across the face (trim)'],
    landSectionTitle: 'Practice on solid ground',
    landSectionSubtitle:
      'Two surfskate drills to groove the compression and flow of a strong bottom turn on dry land.',
    guideSectionTitle: 'The bottom turn, frame by frame',
    guideSectionSubtitle:
      'Study each position in the water reference, then feel for the same shapes on your surfskate.',
    steps: [
      {
        id: 'bt-analyse-1',
        kind: 'analyse',
        title: 'Analyse a bottom turn in the water',
        duration: '10 min',
        image: 'wave',
        summary:
          'Before drilling anything, build the model. Watch the in-water reference at full speed, then slow it down and study the frames below. You are not learning to turn — you are hunting where you leak speed: a turn started too early, a rail buried too shallow, or a body that stands up instead of driving through the arc.',
        cues: [
          'Watch how low the surfer compresses at the base of the wave',
          'See the inside rail buried and held through the whole arc',
          'Track the leading arm and eyes — they point up the face before the board follows',
        ],
        videoId: 'JHJCXi5ZcPY', // in-water bottom-turn reference
      },
      {
        id: 'bt-ss-1',
        kind: 'surfskate',
        title: 'Compression pumps',
        duration: '15 min',
        image: 'compression-pumps',
        summary:
          'Groove the up-and-down compression that powers a bottom turn. Pump the surfskate through deep, controlled compressions and extensions so the movement becomes automatic — the same load you will drive into the base of the wave.',
        cues: [
          'Compress deep and low through the bottom of each pump',
          'Extend fully as you come out to release the stored energy',
          'Lead every move with your eyes and chest, not your feet',
        ],
        videoId: '0t-roluW0PM', // surfskate compression pumps
      },
      {
        id: 'bt-ss-2',
        kind: 'surfskate',
        title: 'Speed & flow',
        duration: '15 min',
        image: 'speed-flow',
        summary:
          'Now link that compression into long, flowing arcs. This drill trains the smooth, drawn-out rail engagement of a real bottom turn — carrying speed through the turn instead of stalling or rushing the redirect.',
        cues: [
          'Draw the arc long and round — never sharp or rushed',
          'Roll smoothly from rail to rail, keeping constant pressure',
          'Keep your trailing arm back and let the turn flow, not jerk',
        ],
        videoId: 'Ie3iErcwuwc', // surfskate speed & flow lesson
      },
    ],
    guide: [
      {
        image: 'bottomturn-step-1',
        title: 'Set line to trough',
        description:
          'Coming off the drop, aim straight for the trough at the base of the wave, carrying all your speed and keeping the board flat and driving.',
      },
      {
        image: 'bottomturn-step-2',
        title: 'Compress on descent',
        description:
          'As you drop to the base, bend deep through the knees and hips — loading your legs like a spring, weight stacked over the board.',
      },
      {
        image: 'bottomturn-step-3',
        title: 'Gaze + lead arm',
        description:
          'Turn your head and reach your leading arm up toward the section you want to hit. The body follows where you look.',
      },
      {
        image: 'bottomturn-step-4',
        title: 'Maximum rail load',
        description:
          'At the bottom of the arc, bury the inside rail and stay low — this is the deepest point of compression, storing all the drive.',
      },
      {
        image: 'bottomturn-step-5',
        title: 'Hold rail through arc',
        description:
          'Keep the rail engaged and pressure constant as the board carves through the turn — do not stand up or let it skid flat.',
      },
      {
        image: 'bottomturn-step-6',
        title: 'Project up the face',
        description:
          'Extend out of the compression to fire the stored energy up the face, projecting the board toward the lip.',
      },
      {
        image: 'bottomturn-step-7',
        title: 'Bottom turn complete',
        description:
          'Come out of the turn tall and balanced, carrying maximum speed and set up perfectly for your next manoeuvre.',
      },
    ],
  },
  {
    id: 'cutback',
    title: 'Cutback Pack',
    maneuver: 'Cutback',
    tagline: 'Return to the pocket, keep the flow',
    level: 'intermediate',
    order: 3,
    accentColor: 'ocean',
    heroImage: 'cutback',
    overview:
      'When you outrun the pocket, the cutback brings you back to the power source. It is all about rotation and committing to the rail.',
    prerequisites: ['Reliable bottom turn', 'Can generate speed on the open face'],
    steps: [
      {
        id: 'cb-ss-1',
        kind: 'surfskate',
        title: 'Full rotation carves',
        duration: '20 min',
        image: 'carve',
        summary: 'Lead with your head and shoulders through a 180° carve and back.',
        cues: ['Head turns first', 'Open the shoulders fully', 'Trail hand skims the ground'],
        videoId: '', // paste YouTube id here
      },
      {
        id: 'cb-ss-2',
        kind: 'surfskate',
        title: 'The rebound',
        duration: '20 min',
        image: 'surfskate',
        summary: 'Complete the arc and rebound cleanly to riding forward again.',
        cues: ['Spot your exit early', 'Re-centre weight on the rebound', 'Stay compressed'],
        videoId: '', // paste YouTube id here
      },
      {
        id: 'cb-water-1',
        kind: 'water',
        title: 'In the water: round-house',
        duration: 'Session',
        image: 'wave',
        summary: 'Take speed down the line, arc back to the whitewater, and bounce off it.',
        cues: ['Commit past vertical', 'Look back at the pocket', 'Absorb the foam rebound'],
        videoId: '', // paste YouTube id here
      },
    ],
  },
  {
    id: 'top-turn',
    title: 'Top Turn Pack',
    maneuver: 'Top Turn',
    tagline: 'Attack the lip with control',
    level: 'intermediate',
    order: 4,
    accentColor: 'coral',
    heroImage: 'topturn',
    overview:
      'The top turn redirects your bottom-turn energy off the top of the wave. Sharp, snappy, and the gateway to more progressive surfing.',
    prerequisites: ['Strong bottom turn', 'Comfortable in steeper sections'],
    steps: [
      {
        id: 'tt-ss-1',
        kind: 'surfskate',
        title: 'Pivot off the top',
        duration: '20 min',
        image: 'carve',
        summary: 'Drive up a bank and snap a quick pivot off the top, then recover.',
        cues: ['Compress on the way up', 'Snap the hips', 'Look back down the line'],
        videoId: '', // paste YouTube id here
      },
      {
        id: 'tt-water-1',
        kind: 'water',
        title: 'In the water: hit the lip',
        duration: 'Session',
        image: 'wave',
        summary: 'Use a bottom turn to project vertically and redirect off the lip.',
        cues: ['Time the lip', 'Keep weight over the board', 'Spot your landing'],
        videoId: '', // paste YouTube id here
      },
    ],
  },
  {
    id: 'snap',
    title: 'Snap Pack',
    maneuver: 'Snap',
    tagline: 'A vertical, explosive hit off the lip',
    level: 'intermediate',
    order: 5,
    accentColor: 'coral',
    heroImage: 'topturn',
    overview:
      'The snap is the sharp, aggressive cousin of the top turn — a fast, near-vertical strike that throws spray and resets your position on the wave. Once your bottom and top turns flow, learn to tighten the arc and snap off both the lip (top snap) and the base (bottom snap). It is all about timing, commitment, and rebounding cleanly.',
    prerequisites: ['Consistent top turn', 'Comfortable in steeper, punchier sections'],
    steps: [
      {
        id: 'snap-ss-1',
        kind: 'surfskate',
        title: 'Tighten the arc',
        duration: '20 min',
        image: 'carve',
        summary:
          'Drive up a steep bank and snap a tight, quick pivot instead of a drawn-out carve. The snap lives in a shorter, sharper radius than the top turn.',
        cues: [
          'Compress hard on the approach',
          'Snap the hips and shoulders together',
          'Keep the radius tight — punchy, not flowing',
        ],
        videoId: '', // paste YouTube id here
      },
      {
        id: 'snap-ss-2',
        kind: 'surfskate',
        title: 'Snap & rebound',
        duration: '20 min',
        image: 'surfskate',
        summary:
          'Practise redirecting hard and rebounding straight back into the line without stalling. A clean snap always exits with speed.',
        cues: [
          'Spot your exit before you commit',
          'Re-centre weight the instant you redirect',
          'Drive out — never wash off all your speed',
        ],
        videoId: '', // paste YouTube id here
      },
      {
        id: 'snap-water-1',
        kind: 'water',
        title: 'In the water: top snap',
        duration: 'Session',
        image: 'wave',
        summary:
          'Use a strong bottom turn to project vertically, then snap off the top lip and redirect back down the face — sharper and later than a top turn.',
        cues: [
          'Hit the lip as it pitches, not before',
          'Throw the tail with your back foot',
          'Keep your eyes and chest pointing back down the face',
        ],
        videoId: '', // paste YouTube id here
      },
      {
        id: 'snap-water-2',
        kind: 'water',
        title: 'In the water: bottom snap',
        duration: 'Session',
        image: 'wave',
        summary:
          'On a fast, open face, snap hard off the base of the wave to reset your line and generate a burst of speed without going to the lip.',
        cues: [
          'Compress deep at the base',
          'Bury the inside rail and release sharply',
          'Project back down the line as you unweight',
        ],
        videoId: '', // paste YouTube id here
      },
    ],
  },
  {
    id: 'air',
    title: 'Air Pack',
    maneuver: 'Air',
    tagline: 'Leave the water behind',
    level: 'advanced',
    order: 6,
    accentColor: 'coral',
    heroImage: 'air',
    overview:
      'The air is progressive surfing’s headline act. Build the timing and body awareness safely on a ramp and surfskate before launching in the water.',
    prerequisites: ['Confident top turns', 'Comfortable in fast, punchy waves'],
    steps: [
      {
        id: 'air-ss-1',
        kind: 'surfskate',
        title: 'Ollie timing',
        duration: '25 min',
        image: 'surfskate',
        summary: 'Groove the pop-and-tuck timing on flat ground and small ramps.',
        cues: ['Load the tail', 'Suck the knees up', 'Level the board in the air'],
        videoId: '', // paste YouTube id here
      },
      {
        id: 'air-water-1',
        kind: 'water',
        title: 'In the water: first launches',
        duration: 'Session',
        image: 'wave',
        summary: 'Find a rampy section, project off the lip, and focus on staying over your board.',
        cues: ['Approach with speed', 'Eyes on the landing', 'Stay stacked, absorb on impact'],
        videoId: '', // paste YouTube id here
      },
    ],
  },
];

export function getPack(id: string): Pack | undefined {
  return PACKS.find((p) => p.id === id);
}

export const COMMUNITY_SPOTS: CommunitySpot[] = [
  {
    id: 'c1',
    surfer: 'Maya R.',
    spotName: 'Ericeira – Ribeira d’Ilhas',
    latitude: 38.9631,
    longitude: -9.4181,
    comment: 'Long right-hand point, mellow on smaller days. Great for practising cutbacks.',
    rating: 5,
  },
  {
    id: 'c2',
    surfer: 'Tomás L.',
    spotName: 'Supertubos, Peniche',
    latitude: 39.3436,
    longitude: -9.3625,
    comment: 'Heavy beach break barrels. Only paddle out when you are confident on the drop.',
    rating: 4,
  },
  {
    id: 'c3',
    surfer: 'Chloe B.',
    spotName: 'Biarritz – Grande Plage',
    latitude: 43.4832,
    longitude: -1.5586,
    comment: 'Forgiving beach break, perfect for pop-up and bottom-turn reps at low tide.',
    rating: 4,
  },
  {
    id: 'c4',
    surfer: 'Diego M.',
    spotName: 'Mundaka',
    latitude: 43.4072,
    longitude: -2.6989,
    comment: 'World-class left when it works. Respect the locals and the sandbar.',
    rating: 5,
  },
  {
    id: 'c5',
    surfer: 'Ana P.',
    spotName: 'Carcavelos',
    latitude: 38.6796,
    longitude: -9.3345,
    comment: 'Consistent city beach break. Fun rampy sections for your first airs.',
    rating: 4,
  },
];

/**
 * Pre-seeded, well-known spots shown on the map in a distinct colour from the
 * user's own recorded spots. Includes surf beaches (on water) and surfskate
 * parks (out of water).
 */
export const KNOWN_SPOTS: KnownSpot[] = [
  // Surf beaches
  {
    id: 'k-beach-1',
    name: 'Ericeira – Ribeira d’Ilhas',
    spotType: 'beach',
    latitude: 38.9631,
    longitude: -9.4181,
    comment: 'Long right-hand point, mellow on smaller days. Great for cutbacks.',
  },
  {
    id: 'k-beach-2',
    name: 'Supertubos, Peniche',
    spotType: 'beach',
    latitude: 39.3436,
    longitude: -9.3625,
    comment: 'Heavy beach-break barrels. World Tour venue.',
  },
  {
    id: 'k-beach-3',
    name: 'Biarritz – Grande Plage',
    spotType: 'beach',
    latitude: 43.4832,
    longitude: -1.5586,
    comment: 'Forgiving beach break, perfect for pop-up and bottom-turn reps.',
  },
  {
    id: 'k-beach-4',
    name: 'Hossegor – La Gravière',
    spotType: 'beach',
    latitude: 43.6664,
    longitude: -1.4425,
    comment: 'Punchy, hollow beach break when the banks line up.',
  },
  // Surfskate parks
  {
    id: 'k-park-1',
    name: 'Lisboa – Parque Skate de Alcântara',
    spotType: 'park',
    latitude: 38.7031,
    longitude: -9.1772,
    comment: 'Smooth bowl and flowing lines — ideal for carve and pump drills.',
  },
  {
    id: 'k-park-2',
    name: 'Ericeira Skate Bowl',
    spotType: 'park',
    latitude: 38.9629,
    longitude: -9.4157,
    comment: 'Mellow transitions a few minutes from the beach. Great warm-up.',
  },
  {
    id: 'k-park-3',
    name: 'Biarritz – Skatepark de la Milady',
    spotType: 'park',
    latitude: 43.4623,
    longitude: -1.5709,
    comment: 'Seaside park with long banks perfect for surfskate flow.',
  },
  {
    id: 'k-park-4',
    name: 'Hossegor – Skatepark',
    spotType: 'park',
    latitude: 43.6612,
    longitude: -1.3958,
    comment: 'Open concrete with rolling transitions for compression pumps.',
  },
];
