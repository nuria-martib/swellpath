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
      'A fast, clean pop up is the difference between making the drop and eating it. Groove the movement pattern on land and a surfskate before chasing consistency in the water.',
    prerequisites: ['Comfortable paddling', 'Can lie centred on the board'],
    steps: [
      {
        id: 'popup-ss-1',
        kind: 'surfskate',
        title: 'Floor rep: chest-to-feet',
        duration: '10 min',
        image: 'popup',
        summary:
          'On a towel, drill the explosive push from prone to a stable stance. One motion, no knees.',
        cues: [
          'Hands under ribs, not by your shoulders',
          'Drive the back foot in first, front foot follows',
          'Land low with knees bent, eyes up the line',
        ],
        videoId: '', // paste YouTube id here
      },
      {
        id: 'popup-ss-2',
        kind: 'surfskate',
        title: 'Surfskate stance check',
        duration: '15 min',
        image: 'surfskate',
        summary:
          'Find your natural stance width and weighting rolling slowly. The board should feel like an extension of your pop-up landing.',
        cues: ['Feet over the bolts', 'Weight 60% front foot', 'Shoulders stacked over hips'],
        videoId: '9rz-ucDwjVU', // out-of-water pop-up practice
      },
      {
        id: 'popup-water-1',
        kind: 'water',
        title: 'In the water: catch & stand',
        duration: 'Session',
        image: 'wave',
        summary:
          'Take small, already-broken waves and commit to a single-motion pop up every time. Quality over quantity.',
        cues: [
          'Paddle two strokes past the point you think you need',
          'Pop the instant you feel the glide',
          'Chin up — look where you want to go',
        ],
        videoId: 'XYZ46bGfZ08', // visualize the pop up in the water
      },
    ],
    guide: [
      {
        image: 'popup-step-1',
        title: 'Paddle position',
        description:
          'Lie centred on the board, chest up, toes near the tail. Paddle strong and level.',
      },
      {
        image: 'popup-step-2',
        title: 'Feel the glide',
        description: 'As the wave picks you up you feel weightless. This is the moment to commit.',
      },
      {
        image: 'popup-step-3',
        title: 'Hands under ribs',
        description:
          'Plant your hands flat on the rails under your ribcage, not up by your shoulders.',
      },
      {
        image: 'popup-step-4',
        title: 'Press up',
        description:
          'Push your chest and hips up in one explosive press, keeping your eyes up the line.',
      },
      {
        image: 'popup-step-5',
        title: 'Back foot in',
        description: 'Drive the back foot in first, landing across the stringer over the tail pad.',
      },
      {
        image: 'popup-step-6',
        title: 'Front foot follows',
        description: 'Slide the front foot between your hands, over the bolts, in the same motion.',
      },
      {
        image: 'popup-step-7',
        title: 'Land low',
        description:
          'Land in a low, athletic stance with knees bent and weight centred over the board.',
      },
      {
        image: 'popup-step-8',
        title: 'Eyes up, ride',
        description: 'Stand tall, look where you want to go, and set your line down the face.',
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
