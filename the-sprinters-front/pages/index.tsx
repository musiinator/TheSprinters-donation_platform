import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { withAuth } from '@/src/common/hoc/with-auth';
import { CharityCase } from '@/src/interfaces/charity-case.interfaces';
import CharityGrid from '@/src/components/charity-case/main-grid.component';
import { useAppDispatch, useAppSelector } from '@/src/hooks/general.hook';
import { getCharityCases } from '@/src/common/redux/reducers/charity-case/charity-case.reducer';
import { GenderEnum, Person } from '@/src/interfaces/person.interface';

// const charityCases: CharityCase[] = [
//   {
//     id: 1,
//     familyName: 'Smith',
//     familyImage: 'https://www.caritate.md/uploads/282x210/53488-img-6781.jpeg',
//     nrBoys: 3,
//     nrGirls: 1,
//     nrChildren: 4,
//     organization: {
//       id: 101,
//       name: 'Hope Foundation',
//       logo: 'https://i.pinimg.com/1200x/04/c4/84/04c484e15dbd8fc0df43c2bde3ff05b1.jpg',
//       domain: 'hopefoundation.org',
//       description: 'Providing support to families in need',
//       location: 'City A',
//       email: 'info@hopefoundation.org',
//     },
//     city: 'City A',
//     county: 'County X',
//     country: 'Country Y',
//     persons: [
//       {
//         firstName: 'John',
//         lastName: 'Smith',
//         age: 7,
//         description: 'Loves playing football',
//         child: true,
//         gender: GenderEnum.MALE,
//         charityCaseId: 1,
//       },
//       {
//         firstName: 'Emma',
//         lastName: 'Smith',
//         age: 5,
//         description: 'Enjoys painting and drawing',
//         child: true,
//         gender: GenderEnum.FEMALE,
//         charityCaseId: 1,
//       },
//       {
//         firstName: 'Lucas',
//         lastName: 'Smith',
//         age: 3,
//         description: 'Loves to explore outdoors',
//         child: true,
//         gender: GenderEnum.MALE,
//         charityCaseId: 1,
//       },
//       {
//         firstName: 'Jonas',
//         lastName: 'Smith',
//         age: 6,
//         description: 'Loves to explore outdoors',
//         child: true,
//         gender: GenderEnum.MALE,
//         charityCaseId: 1,
//       },
//     ],
//   },
//   {
//     id: 2,
//     familyName: 'Johnson',
//     familyImage: 'https://www.caritate.md/uploads/282x210/51717-683648b5-24e6-495b-b686-228fa49dc28f.jpeg',
//     nrBoys: 2,
//     nrGirls: 0,
//     nrChildren: 2,
//     organization: {
//       id: 102,
//       name: 'Care for All',
//       logo: 'https://scalebranding.com/wp-content/uploads/2022/02/pro.jpg',
//       domain: 'careforall.org',
//       description: 'Supporting children for a brighter future',
//       location: 'City B',
//       email: 'support@careforall.org',
//     },
//     city: 'City B',
//     county: 'County Z',
//     country: 'Country X',
//     persons: [
//       {
//         firstName: 'Adam',
//         lastName: 'Johnson',
//         age: 9,
//         description: 'Passionate about science',
//         child: true,
//         gender: GenderEnum.MALE,
//         charityCaseId: 2,
//       },
//       {
//         firstName: 'Noah',
//         lastName: 'Johnson',
//         age: 6,
//         description: 'Loves storytelling and books',
//         child: true,
//         gender: GenderEnum.MALE,
//         charityCaseId: 2,
//       },
//     ],
//   },
//   {
//     id: 3,
//     familyName: 'Garcia',
//     familyImage: 'https://www.caritate.md/uploads/282x210/52975-img-3727.jpeg',
//     nrBoys: 1,
//     nrGirls: 1,
//     nrChildren: 2,
//     organization: {
//       id: 103,
//       name: 'Helping Hands',
//       logo: 'https://png.pngtree.com/template/20190308/ourmid/pngtree-people-s-foundation-icon-image_63268.jpg',
//       domain: 'helpinghands.org',
//       description: 'Empowering families in need',
//       location: 'City C',
//       email: 'info@helpinghands.org',
//     },
//     city: 'City C',
//     county: 'County Y',
//     country: 'Country Z',
//     persons: [
//       {
//         firstName: 'Sophia',
//         lastName: 'Garcia',
//         age: 4,
//         description: 'Loves playing with puzzles',
//         child: true,
//         gender: GenderEnum.FEMALE,
//         charityCaseId: 3,
//       },
//       {
//         firstName: 'Daniel',
//         lastName: 'Garcia',
//         age: 7,
//         description: 'Enjoys building things with blocks',
//         child: true,
//         gender: GenderEnum.MALE,
//         charityCaseId: 3,
//       },
//       {
//         firstName: 'Sarah',
//         lastName: 'Garcia',
//         age: 32,
//         description: 'Meet Sarah, a devoted single mother facing hardships while raising her two children. Striving to provide a nurturing environment despite financial struggles, she s determined to offer her kids a brighter tomorrow. Your support could ease their journey and bring hope into their lives.',
//         child: false,
//         gender: GenderEnum.FEMALE,
//         charityCaseId: 3,
//       }
//     ],
//   },
// ];

function HomePage() {
  //const cases = charityCases;
  const dispatch = useAppDispatch();
  const cases = useAppSelector((state) => state.charityCasesReducer.charityCases);
  const input = useAppSelector((state) => state.filterCharityCaseReducer.input);

  useEffect(() => {
    dispatch(getCharityCases());
  }, [dispatch]);

  const filteredCases = input
    ? cases.filter(
        (c: CharityCase) =>
          c.familyName.toLowerCase().includes(input.toLowerCase()) ||
          c.organization.name.toLowerCase().includes(input.toLowerCase())
      )
    : cases;
  return (
    <>
      <CharityGrid charityCases={filteredCases} />
    </>
  );
}

export default withAuth(HomePage);
