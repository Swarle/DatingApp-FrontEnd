import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {MemberService} from "../_services/member.service";
import {Member} from "../_models/member";

export const memberDetailedResolver: ResolveFn<Member> = (route, state) => {
  const memberService = inject(MemberService);

  return memberService.getMember(route.paramMap.get('username')!);
};
