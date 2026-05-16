import type { GhostSpot, SpotComment } from '../types/spot'

export const HORROR_LABELS = ['', '약간 으스스', '좀 무서움', '꽤 무서움', '매우 무서움', '공포 극한'] as const

export const HORROR_COLORS = ['', '#00e676', '#ffd600', '#ff6d00', '#ff3d00', '#ff1744'] as const

export const DUMMY_SPOT: GhostSpot = {
  id: 'spot-123',
  name: '곤지암 정신병원',
  imageUrl:
    'https://images.unsplash.com/photo-1481018085669-2bc6e4f00eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  isAccessible: false,
  horrorIndex: 5,
  description:
    '과거 원장이 환자들을 두고 도주했다는 괴담이 얽힌 폐병원. 경기도 광주시에 위치하며 CNN이 선정한 세계 7대 공포 명소에 오를 만큼 악명 높은 장소입니다. 폐쇄된 이후에도 인근 주민들로부터 이상한 소리와 불빛이 목격된다는 제보가 꾸준히 이어지고 있습니다.',
}

export const DUMMY_COMMENTS: SpotComment[] = [
  {
    id: 'c1',
    author: '고스트헌터',
    content: '어제 밤에 갔다가 이상한 소리 들음;;',
    createdAt: '2026-05-16',
  },
  {
    id: 'c2',
    author: '공포덕후99',
    content:
      '친구랑 둘이서 입구까지만 갔는데 갑자기 창문에서 뭔가 움직였어요... 다리 후들거려서 그냥 도망쳤습니다',
    createdAt: '2026-05-14',
  },
  {
    id: 'c3',
    author: '밤탐험가',
    content: '사유지라 출입 불가인데 경비도 있으니 무리하게 들어가려다 잡히면 진짜 큰일남 ㅋㅋ',
    createdAt: '2026-05-10',
  },
]
