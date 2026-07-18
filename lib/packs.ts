import type { CommunitySpot, Pack } from './types';
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
        image: 'wave',
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
        image: 'popup',
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
      'The bottom turn sets up every manoeuvre. Learn to compress at the base of the wave and redirect that energy back up the face.',
    prerequisites: ['Consistent pop up', 'Can ride across the face (trim)'],
    steps: [
      {
        id: 'bt-ss-1',
        kind: 'surfskate',
        title: 'Compression pumps',
        duration: '15 min',
        image: 'surfskate',
        summary: 'Generate speed by compressing and extending through carves on a gentle bank.',
        cues: ['Bend deep in the turn', 'Extend as you come out', 'Lead with your eyes and chest'],
        videoId: '', // paste YouTube id here
      },
      {
        id: 'bt-ss-2',
        kind: 'surfskate',
        title: 'Draw the arc',
        duration: '15 min',
        image: 'carve',
        summary: 'Practise long, drawn-out bottom-turn arcs — no rushing the redirect.',
        cues: [
          'Weight the toes/heels smoothly',
          'Keep the arc round, not sharp',
          'Trailing arm back',
        ],
        videoId: '', // paste YouTube id here
      },
      {
        id: 'bt-water-1',
        kind: 'water',
        title: 'In the water: load & release',
        duration: 'Session',
        image: 'wave',
        summary: 'On unbroken waves, drop, compress at the base, and project back toward the lip.',
        cues: [
          'Look up the face early',
          'Bury the inside rail',
          'Point your leading hand where you go',
        ],
        videoId: '', // paste YouTube id here
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
    id: 'air',
    title: 'Air Pack',
    maneuver: 'Air',
    tagline: 'Leave the water behind',
    level: 'advanced',
    order: 5,
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
