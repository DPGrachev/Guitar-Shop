import { GuitarType } from '../const';
import { Comment } from '../types/comment';
import { Guitar } from '../types/guitar';

const mockGuitarCard: Guitar = {
  id: 1,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: GuitarType.Electric,
  description: 'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
  previewImg: 'img/guitar-1.jpg',
  stringCount: 7,
  rating: 4,
  price: 17500,
  comments: [],
};

const mockGuitars: Guitar[] = [
  {
    id: 1,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
    comments: [],
  },
  {
    id: 2,
    name: 'CURT Z300',
    vendorCode: 'TK129049',
    type: GuitarType.Acoustic,
    description: 'Эргономичность гитары и качество сборки являются, пожалуй, её главными преимуществами. Идеальное расположение в руках музыканта дополняется прочностью конструкции из клёна.',
    previewImg: 'img/guitar-8.jpg',
    stringCount: 7,
    rating: 3.5,
    price: 29500,
    comments: [],
  },
  {
    id: 3,
    name: 'Roman LX',
    vendorCode: 'RO111111',
    type: GuitarType.Ukulele,
    description: 'Укулеле класса премиум от компании CURT, собравшая в себе все самые необходимые качества: лёгкость корпуса, прочность струн и компактный размер.',
    previewImg: 'img/guitar-6.jpg',
    stringCount: 4,
    rating: 4,
    price: 6800,
    comments: [],
  },
];

const mockComment: Comment = {
  id: 'a7c267d0-a72d-41bd-8b8e-e7f67800d58a',
  userName: 'Саша',
  advantage: 'Хорошо. Очень хорошо.',
  disadvantage: 'Плохо. Очень плохо.',
  comment: 'Неплохо, но дорого.',
  rating: 3,
  createAt: new Date(),
  guitarId: 1,
};

const mockGuitarWithComment = {
  id: 1,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: GuitarType.Electric,
  description: 'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
  previewImg: 'img/guitar-1.jpg',
  stringCount: 7,
  rating: 4,
  price: 17500,
  comments: [mockComment],
};

export { mockGuitarCard, mockGuitars , mockComment, mockGuitarWithComment };
